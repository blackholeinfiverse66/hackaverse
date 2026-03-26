import { apiService } from './api';

export const notificationService = {
  // Create notification
  create: (notification) => {
    return fetch('http://localhost:8000/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': '2b899caf7e3aea924c96761326bdded5162da31a9d1fdba59a2a451d2335c778'
      },
      body: JSON.stringify(notification)
    }).then(r => r.json());
  },

  // Get user notifications
  getUserNotifications: (userId, unreadOnly = false) => {
    return fetch(`http://localhost:8000/notifications/user/${userId}?unread_only=${unreadOnly}`, {
      headers: {
        'X-API-Key': '2b899caf7e3aea924c96761326bdded5162da31a9d1fdba59a2a451d2335c778'
      }
    }).then(r => r.json());
  },

  // Mark as read
  markAsRead: (notificationId) => {
    return fetch(`http://localhost:8000/notifications/${notificationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': '2b899caf7e3aea924c96761326bdded5162da31a9d1fdba59a2a451d2335c778'
      },
      body: JSON.stringify({ read: true })
    }).then(r => r.json());
  },

  // Delete notification
  delete: (notificationId) => {
    return fetch(`http://localhost:8000/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: {
        'X-API-Key': '2b899caf7e3aea924c96761326bdded5162da31a9d1fdba59a2a451d2335c778'
      }
    }).then(r => r.json());
  },

  // Trigger notifications on events
  onHackathonJoined: (userId, hackathonName) => {
    return notificationService.create({
      user_id: userId,
      title: 'Joined Hackathon',
      message: `You have successfully joined ${hackathonName}!`,
      type: 'hackathon_joined'
    });
  },

  onInvitationReceived: (userId, teamName) => {
    return notificationService.create({
      user_id: userId,
      title: 'Team Invitation',
      message: `You have been invited to join ${teamName}!`,
      type: 'invitation_received'
    });
  },

  onInvitationAccepted: (userId, teamName) => {
    return notificationService.create({
      user_id: userId,
      title: 'Invitation Accepted',
      message: `Your invitation to ${teamName} was accepted!`,
      type: 'invitation_accepted'
    });
  },

  onProjectSubmitted: (userId, projectTitle) => {
    return notificationService.create({
      user_id: userId,
      title: 'Project Submitted',
      message: `Your project "${projectTitle}" has been submitted for judging!`,
      type: 'project_submitted'
    });
  },

  onJudgeReviewed: (userId, score) => {
    return notificationService.create({
      user_id: userId,
      title: 'Judging Complete',
      message: `Your project has been reviewed! Score: ${score}/100`,
      type: 'judge_reviewed'
    });
  }
};
