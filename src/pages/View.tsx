import React, { useState, useEffect } from 'react';
import { RecordContext } from '../contexts/RecordContext';
import { Player } from '../components/Player';
import { Dropdown } from 'primereact/dropdown';
import Nav from '../components/Nav';

const ViewPage = () => {
  const { viewRecord } = React.useContext(RecordContext);

  const [selectedUser, setSelectedUser] = useState(null);
  const [events, setEvents] = useState<any[]>([]);

  if (!viewRecord) {
    console.log('No viewRecord found');
    return <div>No viewRecord found</div>;
  }

  const users = viewRecord.data.map((data) => {
    return {
      label: data.user,
      value: data.user,
    };
  });

  useEffect(() => {
    if (!selectedUser) {
      console.log('No user selected');
      return;
    }

    const events = viewRecord.data.find((data) => data.user === selectedUser);

    if (!events) {
      console.log('No events found');
      return;
    }

    const eventsData = events.data;
    console.log(eventsData);
    setEvents(eventsData);
  }, [selectedUser]);

  return (
    <div>
      <Nav />
      <div className='flex items-center justify-center flex-col min-w-full'>
        <h1 className='mt-[56px] mb-[40px]'>View Page</h1>
        <div className='bg-slate-100 py-[18px] px-[19px] min-w-[400px] mb-[40px] flex items-center justify-between rounded-[10px] shadow-md'>
          <div className='flex flex-col gap-10'>
            <div className='flex justify-between items-center w-full gap-10'>
              <p>Room :</p>
              <p>{viewRecord.name}</p>
            </div>
            <div className='flex justify-between items-center w-full'>
              <p>No. of users :</p>
              <p>{viewRecord.data.length}</p>
            </div>
          </div>
          <div className='flex flex-col gap-10'>
            <div className='flex justify-between items-center w-full gap-10'>
              <p>Users :</p>
              {viewRecord.data.map((n) => (
                <div key={n.id} className='inline-flex flex-col items-start'>
                  <p>{n.user}</p>
                </div>
              ))}
            </div>
            <div className='flex justify-between items-center w-full'>
              <p>Date :</p>
              <p>{viewRecord.createdAt.substring(0, 10)}</p>
            </div>
          </div>
        </div>
        <div className='inline-flex items-center gap-20 min-w-[400px] mb-[40px]'>
          <p className='mr-[10px]'>Select User :</p>
          <Dropdown
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.value)}
            options={users}
            optionLabel='label'
            placeholder='Select a City'
            className='w-[200px] md:w-14rem'
          />
        </div>
        {events.length > 0 ? (
          <Player events={events} />
        ) : (
          <div>Please select a user</div>
        )}
      </div>
    </div>
  );
};

export default ViewPage;
