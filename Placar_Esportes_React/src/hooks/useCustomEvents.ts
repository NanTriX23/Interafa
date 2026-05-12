import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { SportEvent } from '../data/sportsConfig';

export const useCustomEvents = (sportId: string) => {
  const [customEvents, setCustomEvents] = useState<SportEvent[]>([]);

  useEffect(() => {
    if (!sportId) return;

    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('custom_events')
        .select('*')
        .eq('sport_id', sportId);

      if (!error && data) {
        setCustomEvents(data.map(d => ({
          id: d.id,
          name: d.name,
          tableType: d.table_type as any
        })));
      }
    };

    fetchEvents();

    const subscription = supabase
      .channel('public:custom_events')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'custom_events', filter: `sport_id=eq.${sportId}` }, () => {
        fetchEvents();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [sportId]);

  return customEvents;
};
