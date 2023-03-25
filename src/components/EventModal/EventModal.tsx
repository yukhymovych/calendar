import React, { FC, useState, useEffect, useMemo } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  SelectChangeEvent,
} from '@mui/material';
import { DateTimePicker, DatePicker } from '@mui/x-date-pickers';
import { uid } from 'uid';
import { format, addHours, set } from 'date-fns';

import { addItem, updateItem } from '../../firebase/crud';
import { useAuthContext } from '../../context/auth-provider';
import { EventModalType, EventItem, RecurrenceType } from '../../types';

import {
  RecurrenceSelect,
  SelectColor,
  ItemRemoveModal,
  RecurrenceDaySelect,
} from '../../components';

interface EventModalProps {
  defaultStartDate?: Date;
  open: boolean;
  setOpen: (value: boolean) => void;
  type: EventModalType;
  initialData?: EventItem;
  removeButton?: boolean;
}

export const EventModal: FC<EventModalProps> = ({
  defaultStartDate = new Date(),
  open = false,
  setOpen,
  type = EventModalType.Create,
  initialData,
  removeButton = false,
}) => {
  const { user } = useAuthContext();
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const modalTitleText =
    type === EventModalType.Create ? 'Create New Event' : 'Edit Event';
  const modalSubmitButtonText =
    type === EventModalType.Create ? 'Create' : 'Save';
  const formDefaultValue: EventItem = useMemo(() => {
    return {
      id: '',
      title: '',
      place: '',
      additional: '',
      startDate: defaultStartDate,
      endDate: addHours(defaultStartDate, 1),
      color: 'none',
      isAllDayEvent: false,
      recurrence: 'noRecurrence',
      recurrenceDays: [] as string[],
    };
  }, [defaultStartDate]);

  const [formData, setFormData] = useState<EventItem>(formDefaultValue);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (!initialData && type === EventModalType.Create) {
      setFormData(formDefaultValue);
    }
  }, [type, formDefaultValue, initialData]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitButton = () => {
    setOpen(false);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dateFormatting = 'yyyy-MM-dd HH:mm';

    if (!user) return;
    if (type === EventModalType.Create) {
      const createdItemId = uid();
      const createdItem = {
        id: createdItemId,
        title: formData.title,
        place: formData.place || '',
        additional: formData.additional || '',
        startDate: format(new Date(formData.startDate), dateFormatting),
        endDate: format(new Date(formData.endDate), dateFormatting),
        color: formData.color,
        isAllDayEvent: formData.isAllDayEvent,
        recurrence: formData.recurrence,
        recurrenceDays: formData?.recurrenceDays || [],
      };
      addItem(createdItem, user?.uid);
    } else {
      const editedItem = {
        ...initialData,
        ...formData,
        id: initialData?.id || '',
        startDate: format(new Date(formData.startDate), dateFormatting),
        endDate: format(new Date(formData.endDate), dateFormatting),
        isAllDayEvent: formData.isAllDayEvent,
        recurrence: formData.recurrence,
        recurrenceDays: formData?.recurrenceDays || [],
      };
      updateItem(editedItem, user?.uid);
    }
  };

  const handleChange = (data: {
    target: {
      name: string;
      value: string;
    };
  }) => {
    setFormData({
      ...formData,
      [data.target.name]: data.target.value,
    });
  };

  const handleRemove = () => {
    setOpenRemoveModal(true);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleOnSubmit}>
        <DialogTitle>{modalTitleText}</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Title"
            type="text"
            margin="dense"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={formData.title}
            required
          />
          <TextField
            name="place"
            label="Place"
            type="text"
            margin="dense"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={formData.place}
          />
          <TextField
            name="additional"
            label="Additional description"
            type="text"
            margin="dense"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={formData.additional}
          />
          <Grid container justifyContent="space-between">
            <Grid>
              <SelectColor
                defaultValue={initialData?.color || ''}
                onChange={(data) =>
                  setFormData({
                    ...formData,
                    color: data.target.value,
                  })
                }
              />
            </Grid>
            <Grid sx={{ marginTop: '30px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isAllDayEvent}
                    onChange={(data) =>
                      setFormData({
                        ...formData,
                        startDate: set(new Date(formData.startDate), {
                          hours: 0,
                          minutes: 1,
                        }),
                        endDate: set(new Date(formData.endDate), {
                          hours: 23,
                          minutes: 59,
                        }),
                        isAllDayEvent: data.target.checked,
                      })
                    }
                  />
                }
                label="All day event"
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between">
            <Grid>
              <RecurrenceSelect
                defaultValue={formData?.recurrence || 'noRecurrence'}
                onChange={(data: SelectChangeEvent) =>
                  setFormData({
                    ...formData,
                    recurrence: data.target.value,
                  })
                }
              />
            </Grid>
            {formData.recurrence === RecurrenceType.CertainDays && (
              <Grid>
                <RecurrenceDaySelect
                  defaultValue={formData?.recurrenceDays || []}
                  onChange={(data: string[]) =>
                    setFormData({
                      ...formData,
                      recurrenceDays: data,
                    })
                  }
                />
              </Grid>
            )}
          </Grid>
          <Grid container mt="30px" justifyContent="space-between">
            <Grid>
              {formData.isAllDayEvent ? (
                <DatePicker
                  renderInput={(innerProps) => <TextField {...innerProps} />}
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(data) =>
                    setFormData({
                      ...formData,
                      startDate: data as Date,
                      endDate: addHours(data as Date, 1),
                    })
                  }
                />
              ) : (
                <DateTimePicker
                  renderInput={(innerProps) => <TextField {...innerProps} />}
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(data) =>
                    setFormData({
                      ...formData,
                      startDate: data as Date,
                      endDate: addHours(data as Date, 1),
                    })
                  }
                  ampm={false}
                />
              )}
            </Grid>
            <Grid>
              {formData.isAllDayEvent ? (
                <DatePicker
                  renderInput={(innerProps) => <TextField {...innerProps} />}
                  label="End Date"
                  value={formData.endDate}
                  onChange={(data) =>
                    setFormData({
                      ...formData,
                      endDate: data as Date,
                    })
                  }
                />
              ) : (
                <DateTimePicker
                  renderInput={(innerProps) => <TextField {...innerProps} />}
                  label="End Date"
                  value={formData.endDate}
                  onChange={(data) =>
                    setFormData({
                      ...formData,
                      endDate: data as Date,
                    })
                  }
                  ampm={false}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {removeButton && <Button onClick={handleRemove}>Remove event</Button>}
          <Button onClick={handleSubmitButton} type="submit">
            {modalSubmitButtonText}
          </Button>
        </DialogActions>
      </form>
      {removeButton && (
        <ItemRemoveModal
          open={openRemoveModal}
          setOpen={setOpenRemoveModal}
          eventId={initialData?.id || ''}
          callback={() => setOpen(false)}
          itemName="event"
        />
      )}
    </Dialog>
  );
};
