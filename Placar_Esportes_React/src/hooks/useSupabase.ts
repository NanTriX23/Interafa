import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useSupabase = (sportId: string, eventId: string, tableType: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sportId || !eventId) return;

    const tableName = (tableType === 'matches' || tableType === 'matches_sets') ? 'matches' : tableType === 'medals' ? 'medals' : 'rankings';

    const fetchData = async () => {
      setLoading(true);
      
      let query = supabase.from(tableName).select('*');
      
      if (sportId !== 'geral') {
        query = query.eq('sport_id', sportId).eq('event_id', eventId);
      }
      
      if (tableName === 'matches') query = query.order('created_at', { ascending: true });
      else if (tableName === 'rankings') query = query.order('position', { ascending: true });
      else if (tableName === 'medals') query = query.order('position', { ascending: true });

      const { data: result, error } = await query;

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(result || []);
      }
      setLoading(false);
    };

    fetchData();

    // Subscribe to realtime changes
    const filterString = sportId !== 'geral' ? `sport_id=eq.${sportId}` : undefined;
    
    const subscription = supabase
      .channel('public:' + tableName)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName, filter: filterString }, () => {
        // Reload data on any change
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [sportId, eventId, tableType]);

  return { data, loading };
};
