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
    lastUpdate: null
  });

  const fetchAllData = useCallback(async () => {
    try {
      const headers = { 'X-API-Key': '2b899caf7e3aea924c96761326bdded5162da31a9d1fdba59a2a451d2335c778' };

      const [teamsRes, hackathonsRes, submissionsRes, activitiesRes] = await Promise.all([
        fetch('http://localhost:8000/teams/list', { headers }),
        fetch('http://localhost:8000/hackathons', { headers }),
        fetch('http://localhost:8000/submissions', { headers }),
        fetch('http://localhost:8000/admin/activities/recent?limit=50', { headers })
      ]);

      const teams = (await teamsRes.json()).data || [];
      const hackathons = (await hackathonsRes.json()).data || [];
      const submissions = (await submissionsRes.json()).data || [];
      const activities = (await activitiesRes.json()).data || [];

      // Extract participants from teams
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
        participants: Array.from(participantsMap.values()),
        lastUpdate: new Date().toISOString()
      });
    } catch (error) {
      console.error('Sync error:', error);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 3000);
    return () => clearInterval(interval);
  }, [fetchAllData]);

  const value = {
    syncData,
    teams: syncData.teams,
    hackathons: syncData.hackathons,
    submissions: syncData.submissions,
    activities: syncData.activities,
    participants: syncData.participants
  };

  return (
    <SyncContext.Provider value={value}>
      {children}
    </SyncContext.Provider>
  );
};
