import { useState } from 'react';

export const useCreateMeetingState = () => {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('런린이');
  const [capacity, setCapacity] = useState('2');
  const [distance, setDistance] = useState('free');
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [thumbnail, setThumbnail] = useState(
    'https://img.freepik.com/premium-photo/poster-marathon-with-woman-running-background_1130573-186323.jpg?semt=ais_hybrid'
  );
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    title,
    setTitle,
    selectedDate,
    setSelectedDate,
    time,
    setTime,
    description,
    setDescription,
    category,
    setCategory,
    capacity,
    setCapacity,
    distance,
    setDistance,
    showMapModal,
    setShowMapModal,
    selectedLocation,
    setSelectedLocation,
    deadline,
    setDeadline,
    thumbnail,
    setThumbnail,
    handleImageChange,
    thumbnailFile,
    setThumbnailFile
  };
};
