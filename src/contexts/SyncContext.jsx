import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SyncContext = createContext();

export const useSyncContext = () => {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error('useSyncContext must be used within SyncProvider');
  }
  return context;
};

export const SyncProvider = ({ children }) => {
  const [syncData, setSyncData] = useState({
    teams: [],
    participants: [],
    hackathons: [],
    projects: [],
    submissions: [],
    activities: [],
    events: [],
    lastUpdate: null
  });

  const fetchAllData = useCallback(async () => {
    try {
      const headers = { 'X-API-Key': '2b899caf7e3aea924c96761326bdded5162da31a9d1fdba59a2a451d2335c778' };

      const [teamsRes, hackathonsRes, submissionsRes, activitiesRes] = await Promise.all([
        fetch('http://127.0.0.1:8000/teams/list', { headers }).catch(() => null),
        fetch('http://127.0.0.1:8000/api/hackathons', { headers }).catch(() => null),
        fetch('http://127.0.0.1:8000/submissions', { headers }).catch(() => null),
        fetch('http://127.0.0.1:8000/api/admin/dashboard', { headers }).catch(() => null)
      ]);

      const teams = teamsRes ? (await teamsRes.json()).data || [] : [];
      const hackathons = hackathonsRes ? (await hackathonsRes.json()).data || [] : [];
      const submissions = submissionsRes ? (await submissionsRes.json()).data || [] : [];
      const dashboardData = activitiesRes ? (await activitiesRes.json()).data || {} : {};
      const activities = dashboardData.recentActivities || [];

      const participantsMap = new Map();
      teams.forEach(team => {
        const members = team.members || [];
        members.forEach(member => {
          const memberId = typeof member === 'object' ? member.user_id : member;
          if (memberId && !participantsMap.has(memberId)) {
            participantsMap.set(memberId, {
              id: memberId,
              name: typeof member === 'object' ? member.name : `User ${memberId}`,
              email: typeof member === 'object' ? member.email : `user${memberId}@hackaverse.com`
            });
          }
        });
      });

      setSyncData({
        teams,
        hackathons,
        submissions,
        activities,
        events: activities,
        participants: Array.from(participantsMap.values()),
        lastUpdate: new Date().toISOString()
      });
    } catch (error) {
      console.error('Sync error:', error);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 10000);
    return () => clearInterval(interval);
  }, [fetchAllData]);

  const value = {
    syncData,
    teams: syncData.teams,
    hackathons: syncData.hackathons,
    submissions: syncData.submissions,
    activities: syncData.activities,
    events: syncData.events,
    participants: syncData.participants
  };

  return (
    <SyncContext.Provider value={value}>
      {children}
    </SyncContext.Provider>
  );
};
