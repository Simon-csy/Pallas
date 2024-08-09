import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

// const LeftContent = styled('div')(({ theme }) => ({
//   flex: 1,
//   textAlign: 'right',
//   paddingRight: theme.spacing(2),
//   marginTop: theme.spacing(1),
// }));

const RightContent = styled('div')(({ theme }) => ({
  flex: 1,
  textAlign: 'left',
  paddingLeft: theme.spacing(2),
  marginTop: theme.spacing(0.5),
}));

const BookContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
});

export default function LeftAlignedTimeline() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('https://www.simonland.me/api/book')
      .then(response => {
        console.log(response.data);
        const sortedEvents = response.data.sort((a, b) => new Date(b.start) - new Date(a.start));
        setEvents(sortedEvents);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

    return (
      <Timeline sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}>
        {events.map((event, index) => {
          const startDate = formatDate(event.start);
          const endDate = formatDate(event.end);
          const displayDate = startDate === endDate ? startDate : `${startDate} ~ ${endDate}`;

          return (
            <TimelineItem key={index}>
              <TimelineOppositeContent >
                <Typography variant="body1">{displayDate}</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                {index < events.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <RightContent>
                <BookContainer>
                  {event.book.link ? (
                    <Link
                      href={`https://www.simonland.me/${event.book.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center' }}
                    >
                      <Typography variant="h6" style={{ marginRight: '8px' }}>{event.book.name}</Typography>
                    </Link>
                  ) : (
                    <Typography variant="h6" style={{ marginRight: '8px' }}>{event.book.name}</Typography>
                  )}
                  {event.book.google && event.book.google.split(',').map((url, index) => (
                    <IconButton
                      key={index}
                      size="small"
                      href={url.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                  ))}
                </BookContainer>
              </RightContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    );
  }