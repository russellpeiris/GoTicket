import React, { useState } from 'react'
import { Button } from 'react-native'
import DatePicker from 'react-native-modern-datepicker';

export const Modal = () => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  return (
    <>
      <DatePicker
        onSelectedChange={date => setSelectedDate(date)}
      />
    </>
  )
}