import React from 'react';

import Nav from '../components/Nav';
import { getRecords, deleteRecord } from '../api';
import { Record } from '../api/interface/records/record.interface';
import { RecordContext } from '../contexts/RecordContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { records, setRecords, setViewRecord } =
    React.useContext(RecordContext);

  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    getRecords().then((res) => {
      if (res.status === false) {
        console.log(res.error);
        return;
      }
      console.log(res.data);
      setRecords(res.data?.records || []);
      setLoading(false);
    });
  }, []);

  const handleView = (id: string) => {
    console.log(id);

    const record = records.find((record) => record.id === id);

    if (!record) {
      console.log('No record found');
      return;
    }

    setViewRecord(record);

    navigate(`/view/${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(id);

    const record = records.find((record) => record.id === id);

    if (!record) {
      console.log('No record found');
      return;
    }

    const newRecords = records.filter((record) => record.id !== id);

    setRecords(newRecords);

    navigate(`/`);

    deleteRecord(id).then((res) => {
      if (res.status === false) {
        console.log(res.error);
        return;
      }
      console.log(res.data);
      setLoading(false);
    });
  };

  return (
    <div>
      <Nav />
      <div className='w-full flex items-center justify-center mt-[56px]'>
        <h2 className=' text-lg'>List of Recordings</h2>
      </div>

      {loading ? (
        <div className='w-full flex items-center justify-center mt-[56px] gap-[20px]'>
          <p className='text-lg'>Loading.....</p>
        </div>
      ) : records.length === 0 ? (
        <div className='w-full flex items-center justify-center mt-[56px] gap-[20px]'>
          <p className='text-lg'>No Records</p>
        </div>
      ) : (
        <div className='w-full flex flex-wrap items-center justify-center mt-[56px] gap-[50px]'>
          {records.map((record) => {
            const name = record.data.map((data) => data.user);
            // console.log(name);

            return (
              <div
                key={record.id}
                className='bg-slate-100 py-[18px] px-[19px] min-w-[222px] min-h-[300px] inline-flex flex-col items-center justify-between rounded-[10px] shadow-md'
              >
                <div className='flex justify-between items-center w-full'>
                  <p>Room :</p>
                  <p>{record.name}</p>
                </div>
                <div className='flex justify-between items-center w-full'>
                  <p>No. of users :</p>
                  <p>{record.data.length}</p>
                </div>
                <div className='flex justify-between items-center w-full'>
                  <p>Users :</p>
                  {name.map((n) => (
                    <div
                      key={n + Math.random()}
                      className='inline-flex flex-col items-start'
                    >
                      <p>{n}</p>
                    </div>
                  ))}
                </div>
                <div className='flex justify-between items-center w-full'>
                  <p>Date :</p>
                  <p>{record.createdAt.substring(0, 10)}</p>
                </div>
                {/* button */}
                <div className='w-full flex items-center justify-center'>
                  <button
                    onClick={() => {
                      handleView(record.id);
                    }}
                    className=' bg-blue-500 py-[10px] px-[20px] rounded-[10px] text-white'
                  >
                    View
                  </button>
                  <div className='w-[30px]'></div>
                  <button
                    onClick={() => {
                      handleDelete(record.id);
                    }}
                    className=' bg-red-500 py-[10px] px-[20px] rounded-[10px] text-white'
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
