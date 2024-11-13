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
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [thumbnail, setThumbnail] = useState(
    'https://runto-project.s3.ap-northeast-2.amazonaws.com/temp/4150e355-5853-48b5-83da-13b7159394e3.webp'
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
    handleImageChange
  };
};
