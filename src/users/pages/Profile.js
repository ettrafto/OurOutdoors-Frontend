import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import EventList from '../../feed/components/EventList';

import pfp from '../../pictures/profilePic.jpg'

// Assuming you have some path setup for images
//import defaultProfileImage from '../../assets/profile-placeholder.png';

import './Profile.css'; 


const Profile = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState({
        name: 'JohnDoe',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque.',
        profileImage: '',//defaultProfileImage, 
        events: [] // This would be fetched from the server
    });


    useEffect(() => {
      // Simulate fetching user profile data and events
      const fetchProfileAndEvents = async () => {
          // Fetch logic here or static data for example
          setUserProfile({
              name: 'JohnDoe',
              about: 'I love sports and organizing events.',
              profileImage: pfp,
              events: [
                {
                  id: 'e1',
                  authorId: 'u1',
                  authorName: 'humaen',
                  sportId: 'Moutain Biking',
                  title: 'Bolton Potholes',
                  description: 'I am going to Bolton Potholes at 9am to do the sunrise trail, I have 3 seats in my car and a bike rack!',
                  imageUrl: '',
                  datetime: '4/20/24 4:00pm',
                  address: '1 Bolton Valley Access Rd, Bolton, VT 05676', 
                  participants: ['u2','u3','u4'],
                  comments: {
                      comments: [
                          'i love mountain biking',
                          'im pumped',
                          'ill be there'
                      ]
                  },
                  likes: {
                      likes: [
                          'u2','u3','u4'
                      ]
                  }
          
              }
              ]
          });
      };

      fetchProfileAndEvents();
  }, []);

    return (
      <div className="profile-page">
          <Card className="profile-card">
              <div className="profile-header">
                  <img src={userProfile.profileImage} alt={userProfile.name} className="profile-image" />
                  <div className="profile-info">
                      <h2>{userProfile.name}</h2>
                      <p>{userProfile.about}</p>
                      <Button onClick={() => navigate('/profile/edit/u1')}>Edit Profile</Button>
                  </div>
              </div>
          </Card>
          <EventList items={userProfile.events} />
      </div>
  );
};

export default Profile;