// API client utilities
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function fetchPlaybooks() {
  return apiCall('/playbooks');
}

export async function fetchPrompts(packId?: string) {
  const url = packId ? `/prompts?packId=${packId}` : '/prompts';
  return apiCall(url);
}

export async function fetchResources() {
  return apiCall('/resources');
}

export async function fetchAITools() {
  return apiCall('/tools');
}

export async function fetchRoadmaps() {
  return apiCall('/roadmaps');
}

export async function savePrompt(promptId: string) {
  return apiCall('/user/save-prompt', {
    method: 'POST',
    body: JSON.stringify({ promptId }),
  });
}

export async function saveResource(resourceId: string) {
  return apiCall('/user/save-resource', {
    method: 'POST',
    body: JSON.stringify({ resourceId }),
  });
}
