import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import EventListColumn from './EventListColumn';

jest.mock('firebase/database', () => ({
  __esModule: true,
  getDatabase: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  __esModule: true,
  getAuth: jest.fn(),
}));

describe('EventListColumn', () => {
  const mockEvents = [
    {
      id: '1',
      title: 'Event 1',
      startDate: new Date('2024-02-23T10:00:00'),
      endDate: new Date('2024-02-23T12:00:00'),
      place: 'Some Place',
      additional: 'Additional Info 1',
      color: '#f44336',
      isAllDayEvent: false,
      recurrence: 'noRecurrence',
      recurrenceDays: [],
    },
    {
      id: '2',
      title: 'Event 2',
      startDate: new Date('2024-02-23T10:00:00'),
      endDate: new Date('2024-02-23T13:00:00'),
      place: 'Some Place 2',
      additional: 'Additional Info 2',
      color: '#f44336',
      isAllDayEvent: false,
      recurrence: 'noRecurrence',
      recurrenceDays: [],
    },
    {
      id: '3',
      title: 'Event 3',
      startDate: new Date('2024-02-23T10:40:00'),
      endDate: new Date('2024-02-23T12:50:00'),
      place: 'Some Place 3',
      additional: 'Additional Info 3',
      color: '#f44336',
      isAllDayEvent: false,
      recurrence: 'noRecurrence',
      recurrenceDays: [],
    },
    {
      id: '4',
      title: 'Event 4',
      startDate: new Date('2024-02-23T14:00:00'),
      endDate: new Date('2024-02-23T17:00:00'),
      place: 'Some Place 4',
      additional: 'Additional Info 4',
      color: '#f44336',
      isAllDayEvent: false,
      recurrence: 'noRecurrence',
      recurrenceDays: [],
    },
    {
      id: '5',
      title: 'Event 5',
      startDate: new Date('2024-02-23T13:00:00'),
      endDate: new Date('2024-02-23T13:40:00'),
      place: 'Some Place 5',
      additional: 'Additional Info 5',
      color: '#f44336',
      isAllDayEvent: true,
      recurrence: 'noRecurrence',
      recurrenceDays: [],
    },
    // Add more mock events as needed for testing different scenarios
  ];

  it('renders title and "See All" button', () => {
    render(<EventListColumn title="Test Column" data={mockEvents} />);

    expect(screen.getByText('Test Column')).toBeInTheDocument();
    expect(screen.getByText('See All')).toBeInTheDocument();
  });

  it('renders event', () => {
    render(<EventListColumn title="Test Column" data={mockEvents} />);

    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('10:00-12:00')).toBeInTheDocument();
    expect(screen.getByText('Some Place')).toBeInTheDocument();
    expect(screen.getByText('Additional Info 1')).toBeInTheDocument();
  });

  it('expands to show all events when "See All" is clicked', () => {
    render(<EventListColumn title="Test Column" data={mockEvents} />);

    expect(screen.queryByText('Event 5')).not.toBeInTheDocument();

    userEvent.click(screen.getByText('See All'));

    expect(screen.getByText('Event 5')).toBeInTheDocument();
  });

  it('shows edit event modal when edit button is clicked', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <EventListColumn title="Test Column" data={mockEvents} />
      </LocalizationProvider>
    );

    fireEvent.click(screen.getByTestId('edit-button-1'));
    const text = screen.getByText(/Additional description/i);
    expect(text).toBeInTheDocument();
  });

  it('shows remove event modal when remove button is clicked', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <EventListColumn title="Test Column" data={mockEvents} />
      </LocalizationProvider>
    );

    fireEvent.click(screen.getByTestId('remove-button-1'));
    const text = screen.getByText(
      /Are you sure you want to remove this event?/i
    );
    expect(text).toBeInTheDocument();
  });
});
