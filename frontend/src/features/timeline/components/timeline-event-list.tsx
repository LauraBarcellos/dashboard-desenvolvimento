'use client';

import { memo } from 'react';
import { TimelineEventItem } from './timeline-event-item';
import type { TimelineEvent } from '../types';

interface TimelineEventListProps {
  events: TimelineEvent[];
}

/**
 * Premium timeline event list component
 * Fintech-secure personality: professional timeline layout with staggered animations
 * Displays a chronological list of events with premium spacing
 */
export const TimelineEventList = memo(function TimelineEventList({
  events,
}: TimelineEventListProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <div
      className="space-y-0"
      role="feed"
      aria-label="Timeline de eventos"
    >
      {events.map((event, index) => (
        <TimelineEventItem
          key={event.id}
          event={event}
          isLast={index === events.length - 1}
          index={index}
        />
      ))}
    </div>
  );
});
