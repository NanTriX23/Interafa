import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface StaticEventOverride {
  event_id: string;
  name: string;
  table_type: string;
}

/**
 * Fetches overrides for static (sportsConfig) events from the
 * `static_event_overrides` table, keyed by event_id.
 * Returns a Map so callers can do quick lookups.
 */
export const useStaticEventOverrides = (sportId: string) => {
  const [overrides, setOverrides] = useState<Map<string, StaticEventOverride>>(new Map());

  const fetchOverrides = async () => {
    if (!sportId) return;
    const { data, error } = await supabase
      .from('static_event_overrides')
      .select('*')
      .eq('sport_id', sportId);

    if (!error && data) {
      const map = new Map<string, StaticEventOverride>();
      data.forEach((row: any) => {
        map.set(row.event_id, {
          event_id: row.event_id,
          name: row.name,
          table_type: row.table_type,
        });
      });
      setOverrides(map);
    }
  };

  useEffect(() => {
    fetchOverrides();

    const subscription = supabase
      .channel(`static_overrides_${sportId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'static_event_overrides',
          filter: `sport_id=eq.${sportId}`,
        },
        () => fetchOverrides()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sportId]);

  return { overrides, refetch: fetchOverrides };
};
