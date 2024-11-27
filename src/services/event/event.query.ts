import { useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import EventService from './event.url';

interface EventPayload {
  data: {
    name: string;
    date: string;
    detail: string;
    organizer: string;
  };
  image: File;
}

// Query for GET all events
export const useGetAllEvents = (params?: Event[]) => {
  return useQuery({
    queryKey: ['events', params],
    // queryFn: async () => EventService.getAllEvents(params),

    queryFn: async () => {
      const response = await EventService.getAllEvents(params);
      return response.data;
    },
  });
};

// Mutation for ADD event
export const useAddEvent = (
  options?: UseMutationOptions<AxiosResponse, unknown, EventPayload>,
) => {
  return useMutation<AxiosResponse, unknown, EventPayload>({
    mutationFn: async (payload: EventPayload) => {
      const response = await EventService.addEvent(payload);
      return response.data;
    },
    ...options,
  });
};

// Mutation for UPDATE event data
export const useUpdateEvent = (
  options?: UseMutationOptions<AxiosResponse, unknown, { id: string; data: Event }>,
) => {
  return useMutation<AxiosResponse, unknown, { id: string; data: Event }>({
    mutationFn: async ({ id, data }: { id: string; data: Event }) => {
      const response = await EventService.updateEvent(id, data);
      return response.data;
    },
    ...options,
  });
};

// Mutation for DELETE event
export const useDeleteEvent = (
  options?: UseMutationOptions<void, unknown, string>,
) => {
  return useMutation<void, unknown, string>({
    mutationFn: async (id: string) => {
      await EventService.deleteEvent(id);
    },
    ...options,
  });
};
