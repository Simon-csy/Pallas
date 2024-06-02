import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// const TimelineItemContainer = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
// }));

const LeftContent = styled('div')(({ theme }) => ({
  flex: 1,
  textAlign: 'right',
  paddingRight: theme.spacing(2),
}));

const RightContent = styled('div')(({ theme }) => ({
  flex: 1,
  textAlign: 'left',
  paddingLeft: theme.spacing(2),
}));

export default function BasicTimeline() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual API endpoint
    axios.get('https://www.simonland.me/api/book')
      .then(response => {
        console.log(response.data);
        setEvents(response.data);
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
    <Timeline>
      {events.map((event, index) => {
        const startDate = formatDate(event.start);
        const endDate = formatDate(event.end);
        const displayDate = startDate === endDate ? startDate : `${startDate} ~ ${endDate}`;

        return (
          <TimelineItem key={index}>
            <LeftContent>
              <Typography variant="body1">{displayDate}</Typography>
            </LeftContent>
            <TimelineSeparator>
              <TimelineDot />
              {index < events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <RightContent>
              <Typography variant="h6">{event.book.name}</Typography>
            </RightContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
