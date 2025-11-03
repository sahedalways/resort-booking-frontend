"use client";

import { createContext, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { http } from "../../services/httpService";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventList, setEventList] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [isEventLoading, setIsEventLoading] = useState(false);

  const fetchAllEvents = useCallback(async () => {
    setIsEventLoading(true);
    try {
      const res = await http.get("event-data");

      setEventList(res.data.data);
      return res.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch events");
      return [];
    } finally {
      setIsEventLoading(false);
    }
  }, []);

  const fetchEventById = useCallback(async (id) => {
    setIsEventLoading(true);
    try {
      const res = await http.get(`single-event-data/${id}`);
      setEventDetails(res.data.data);
      return res.data.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch event details"
      );
      return null;
    } finally {
      setIsEventLoading(false);
    }
  }, []);

  return (
    <EventContext.Provider
      value={{
        eventList,
        eventDetails,
        isEventLoading,
        fetchAllEvents,
        fetchEventById,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
