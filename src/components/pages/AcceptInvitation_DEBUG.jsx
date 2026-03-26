import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import { useToast } from '../../hooks/useToast';

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { success, error } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [invitation, setInvitation] = useState(null);
  const [invitationError, setInvitationError] = useState(null);
  const [acceptanceSuccess, setAcceptanceSuccess] = useState(false);
  const [acceptedData, setAcceptedData] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  
  const token = searchParams.get('token');

  useEffect(() => {
    console.log('=== AcceptInvitation Component Mounted ===');
    console.log('Token from URL:', token);
    console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
    console.log('API Key:', import.meta.env.VITE_API_KEY);
    
    if (!token) {
      console.error('No token found in URL');
      setInvitationError('Invalid invitation link');
      setLoading(false);
      setDebugInfo('No token in URL');
      return;
    }

    fetchInvitationDetails();
  }, [token]);

  const fetchInvitationDetails = async () => {
    try {
      console.log('Fetching invitation details for token:', token);
      setDebugInfo('Fetching invitation details...');
      
      const response = await apiService.teams.getInvitationDetails(token);
      console.log('Invitation details response:', response);
      
      setInvitation(response.data.data);
      setDebugInfo('Invitation loaded successfully');
    } catch (err) {
      console.error('Error fetching invitation:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      
      const errorMsg = err.response?.data?.detail || err.message || 'Invalid or expired invitation';
      setInvitationError(errorMsg);
      setDebugInfo(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptInvitation = async () => {
    try {
      console.log('=== Accepting Invitation ===');
      console.log('Token:', token);
      setAccepting(true);
      setDebugInfo('Processing acceptance...');
      
      const response = await apiService.teams.acceptInvitation(token);
      console.log('Acceptance response:', response);
      
      const data = response.data;
      console.log('Response data:', data);
      
      // Store the accepted data for display
      setAcceptedData(data);
      setAcceptanceSuccess(true);
      setDebugInfo('Invitation accepted successfully!');
      
      success(`Successfully joined ${data.team_name || 'the team'}!`);
      
      // Redirect to teams page after 3 seconds
      setTimeout(() => {
        console.log('Redirecting to /app/teams');
        navigate('/app/teams');
      }, 3000);
    } catch (err) {
      console.error('Error accepting invitation:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to accept invitation';
      setDebugInfo(`Error: ${errorMsg}`);
      error(errorMsg);
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading invitation...</p>
          <p className="text-xs text-gray-500 mt-4">{debugInfo}</p>
        </div>
      </div>
    );
  }

  if (acceptanceSuccess && acceptedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🎉 Welcome!
          </h1>
          <p className="text-lg text-green-600 dark:text-green-400 font-semibold mb-4">
            You have successfully registered!
          </p>

          {/* Team Details */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 mb-6 text-left">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Information</h2>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-blue-600 dark:text-blue-400 mr-3 text-xl">👥</span>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Team Name</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {acceptedData.team_name || 'N/A'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-purple-600 dark:text-purple-400 mr-3 text-xl">🏆</span>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Hackathon</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {acceptedData.hackathon_name || 'N/A'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-3 text-xl">✓</span>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                  <p className="text-base font-semibold text-green-600 dark:text-green-400">
                    Member Added
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>✓ Email Registered:</strong> Your email has been added to the team member list.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/app/teams')}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Go to Teams
            </button>
            
            <button
              onClick={() => navigate('/app')}
              className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Go to Dashboard
            </button>
          </div>

          {/* Auto-redirect message */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
            Redirecting to teams page in 3 seconds...
          </p>
          
          {/* Debug Info */}
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300">
            <p>Debug: {debugInfo}</p>
          </div>
        </div>
      </div>
    );
  }

  if (invitationError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Invalid Invitation
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {invitationError}
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Go to Homepage
          </button>
          
          {/* Debug Info */}
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300">
            <p>Debug: {debugInfo}</p>
            <p>Token: {token}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="text-blue-500 text-6xl mb-4">🚀</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Team Invitation
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You've been invited to join a hackathon team!
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Team Details</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Team:</strong> {invitation?.team_name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Hackathon:</strong> {invitation?.hackathon_name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Invited Email:</strong> {invitation?.invitee_email}
            </p>
          </div>

          {invitation?.expires_at && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Expires:</strong> {new Date(invitation.expires_at).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleAcceptInvitation}
            disabled={accepting}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
          >
            {accepting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Accepting...
              </span>
            ) : (
              'Accept Invitation'
            )}
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-medium py-3 rounded-lg transition-colors"
          >
            Decline
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By accepting, you'll become a member of this team and can collaborate on the hackathon project.
          </p>
          
          {/* Debug Info */}
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300">
            <p>Debug: {debugInfo}</p>
            <p>Token: {token}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptInvitation;
