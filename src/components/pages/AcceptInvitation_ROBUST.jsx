import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import { useToast } from '../../hooks/useToast';

/**
 * ROBUST INVITATION ACCEPTANCE COMPONENT
 * 
 * States:
 * 1. LOADING - Fetching invitation details
 * 2. PENDING - Showing invitation details, waiting for user action
 * 3. ACCEPTING - Processing acceptance
 * 4. SUCCESS - Showing success screen
 * 5. ERROR - Showing error screen
 * 6. EXPIRED - Showing expired invitation
 */

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  
  // State management
  const [state, setState] = useState('LOADING'); // LOADING, PENDING, ACCEPTING, SUCCESS, ERROR, EXPIRED
  const [invitation, setInvitation] = useState(null);
  const [acceptedData, setAcceptedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  
  const token = searchParams.get('token');

  // ========================================================================
  // LIFECYCLE - Fetch invitation details on mount
  // ========================================================================

  useEffect(() => {
    console.log('[AcceptInvitation] Component mounted');
    console.log('[AcceptInvitation] Token:', token ? `${token.substring(0, 20)}...` : 'MISSING');
    
    if (!token) {
      console.error('[AcceptInvitation] No token provided');
      setErrorMessage('Invalid invitation link');
      setErrorDetails('No token found in URL');
      setState('ERROR');
      return;
    }

    fetchInvitationDetails();
  }, [token]);

  // ========================================================================
  // FETCH INVITATION DETAILS
  // ========================================================================

  const fetchInvitationDetails = async () => {
    console.log('[AcceptInvitation] Fetching invitation details');
    
    try {
      setState('LOADING');
      setErrorMessage(null);
      setErrorDetails(null);
      
      console.log('[AcceptInvitation] Calling API: GET /teams/invitations/{token}');
      const response = await apiService.teams.getInvitationDetails(token);
      
      console.log('[AcceptInvitation] API Response:', response);
      
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response format from server');
      }
      
      const invitationData = response.data.data;
      console.log('[AcceptInvitation] Invitation data:', invitationData);
      
      setInvitation(invitationData);
      setState('PENDING');
      
    } catch (err) {
      console.error('[AcceptInvitation] Error fetching invitation:', err);
      
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to load invitation';
      const statusCode = err.response?.status;
      
      if (statusCode === 400 && errorMsg.includes('expired')) {
        console.log('[AcceptInvitation] Invitation expired');
        setErrorMessage('Invitation Expired');
        setErrorDetails('This invitation has expired. Please request a new one.');
        setState('EXPIRED');
      } else if (statusCode === 404) {
        console.log('[AcceptInvitation] Invitation not found');
        setErrorMessage('Invalid Invitation');
        setErrorDetails('This invitation does not exist or has already been used.');
        setState('ERROR');
      } else {
        console.log('[AcceptInvitation] Generic error');
        setErrorMessage('Failed to Load Invitation');
        setErrorDetails(errorMsg);
        setState('ERROR');
      }
    }
  };

  // ========================================================================
  // HANDLE ACCEPT INVITATION
  // ========================================================================

  const handleAcceptInvitation = async () => {
    console.log('[AcceptInvitation] Accept button clicked');
    console.log('[AcceptInvitation] Token:', token ? `${token.substring(0, 20)}...` : 'MISSING');
    
    if (!token) {
      console.error('[AcceptInvitation] No token available');
      setErrorMessage('Invalid Request');
      setErrorDetails('Token is missing. Please use the link from your email.');
      setState('ERROR');
      return;
    }

    setState('ACCEPTING');
    setErrorMessage(null);
    setErrorDetails(null);
    
    try {
      console.log('[AcceptInvitation] Calling API: POST /teams/invitations/accept');
      console.log('[AcceptInvitation] Request body:', { token: `${token.substring(0, 20)}...` });
      
      const response = await apiService.teams.acceptInvitation(token);
      
      console.log('[AcceptInvitation] API Response:', response);
      
      if (!response.data) {
        throw new Error('No response data from server');
      }
      
      const data = response.data;
      
      // Validate response has required fields
      if (!data.success) {
        throw new Error(data.message || 'Server returned success=false');
      }
      
      if (!data.team_id || !data.team_name) {
        console.warn('[AcceptInvitation] Response missing required fields:', data);
        throw new Error('Invalid response format: missing team information');
      }
      
      console.log('[AcceptInvitation] Acceptance successful');
      console.log('[AcceptInvitation] Team ID:', data.team_id);
      console.log('[AcceptInvitation] Team Name:', data.team_name);
      
      // Store accepted data and show success screen
      setAcceptedData(data);
      setState('SUCCESS');
      
      // Show success toast
      success(`Successfully joined ${data.team_name}!`);
      
      // Auto-redirect after 3 seconds
      console.log('[AcceptInvitation] Scheduling redirect to /app/teams in 3 seconds');
      setTimeout(() => {
        console.log('[AcceptInvitation] Redirecting to /app/teams');
        navigate('/app/teams');
      }, 3000);
      
    } catch (err) {
      console.error('[AcceptInvitation] Error accepting invitation:', err);
      console.error('[AcceptInvitation] Error response:', err.response);
      
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to accept invitation';
      const statusCode = err.response?.status;
      
      setState('ERROR');
      setErrorMessage('Failed to Accept Invitation');
      setErrorDetails(errorMsg);
      
      // Show error toast
      showError(errorMsg);
    }
  };

  // ========================================================================
  // RENDER - LOADING STATE
  // ========================================================================

  if (state === 'LOADING') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading invitation...</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Please wait while we verify your invitation</p>
        </div>
      </div>
    );
  }

  // ========================================================================
  // RENDER - ERROR STATE (Generic Error)
  // ========================================================================

  if (state === 'ERROR') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 text-center">
          {/* Error Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {errorMessage || 'Error'}
          </h1>
          <p className="text-lg text-red-600 dark:text-red-400 font-semibold mb-4">
            Something went wrong
          </p>

          {/* Error Details */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-red-800 dark:text-red-200">
              <strong>Details:</strong> {errorDetails || 'An unexpected error occurred'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => {
                console.log('[AcceptInvitation] Retry button clicked');
                fetchInvitationDetails();
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Try Again
            </button>
            
            <button
              onClick={() => {
                console.log('[AcceptInvitation] Go Home button clicked');
                navigate('/');
              }}
              className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Go to Homepage
            </button>
          </div>

          {/* Debug Info */}
          <div className="mt-6 p-3 bg-gray-100 dark:bg-gray-700 rounded text-left">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-mono break-all">
              Token: {token ? `${token.substring(0, 20)}...` : 'MISSING'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================================
  // RENDER - EXPIRED STATE
  // ========================================================================

  if (state === 'EXPIRED') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 text-center">
          {/* Expired Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
              <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Expired Message */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Invitation Expired
          </h1>
          <p className="text-lg text-yellow-600 dark:text-yellow-400 font-semibold mb-4">
            This invitation is no longer valid
          </p>

          {/* Expired Details */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Invitations expire after 7 days. Please ask the team to send you a new invitation.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================================
  // RENDER - SUCCESS STATE
  // ========================================================================

  if (state === 'SUCCESS' && acceptedData) {
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
            Welcome!
          </h1>
          <p className="text-lg text-green-600 dark:text-green-400 font-semibold mb-4">
            You have successfully joined the team!
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
              onClick={() => {
                console.log('[AcceptInvitation] Go to Teams button clicked');
                navigate('/app/teams');
              }}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Go to Teams
            </button>
            
            <button
              onClick={() => {
                console.log('[AcceptInvitation] Go to Dashboard button clicked');
                navigate('/app');
              }}
              className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Go to Dashboard
            </button>
          </div>

          {/* Auto-redirect message */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
            Redirecting to teams page in 3 seconds...
          </p>
        </div>
      </div>
    );
  }

  // ========================================================================
  // RENDER - PENDING STATE (Waiting for user action)
  // ========================================================================

  if (state === 'PENDING' && invitation) {
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
              disabled={state === 'ACCEPTING'}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
            >
              {state === 'ACCEPTING' ? (
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
              onClick={() => {
                console.log('[AcceptInvitation] Decline button clicked');
                navigate('/');
              }}
              className="w-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-medium py-3 rounded-lg transition-colors"
            >
              Decline
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By accepting, you'll become a member of this team and can collaborate on the hackathon project.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================================
  // RENDER - ACCEPTING STATE (Processing)
  // ========================================================================

  if (state === 'ACCEPTING') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Accepting invitation...</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Please wait while we process your request</p>
        </div>
      </div>
    );
  }

  // ========================================================================
  // FALLBACK - Should never reach here
  // ========================================================================

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">Unknown state: {state}</p>
      </div>
    </div>
  );
};

export default AcceptInvitation;
