import React from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import { getControls, setControl, updateControl } from '../api';
import Nav from '../components/Nav';

function ControlsPage() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState() as any;
  const [controls, setControls] = React.useState() as any;
  const [selectedControl, setSelectedControl] = React.useState() as any;
  const [selectedStatus, setSelectedStatus] = React.useState() as any;

  const list = [
    {
      name: 'LINEOWNER',
      value: 'LINEOWNER',
    },
    {
      name: 'CURSOR',
      value: 'CURSOR',
    },
    {
      name: 'RADAR',
      value: 'RADAR',
    },
  ];

  const status = [
    {
      name: 'ON',
      value: true,
    },
    {
      name: 'OFF',
      value: false,
    },
  ];

  const getExitingControl = async () => {
    setLoading(true);
    const control = await getControls();

    if (control.status === false) {
      setError(control.error);
      setLoading(false);
      return;
    }

    setLoading(false);

    console.log(control.data.controls);

    setControls(control.data.controls);
  };

  React.useEffect(() => {
    getExitingControl();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const existingControl = controls.find(
      (c: any) => c.name === selectedControl
    );

    if (existingControl) {
      const control = await updateControl(selectedControl, selectedStatus);

      if (control.status === false) {
        setError(control.error);
        setLoading(false);
        return;
      }

      getExitingControl();

      return;
    }

    const control = await setControl(selectedControl, selectedStatus);

    if (control.status === false) {
      setError(control.error);
      setLoading(false);
      return;
    }

    getExitingControl();
  };

  if (loading) {
    return (
      <div className='min-w-full min-h-screen bg-white flex justify-center items-center'>
        <div className='w-[700px] h-[500px] bg-slate-100 shadow-2xl flex flex-col items-center'>
          <h1 className='mt-10 font-bold text-[25px]'>
            MayCode Editor Monitor
            {/* <span className='text-slate-500'>v0.1.0</span> */}
          </h1>
          <div className='flex flex-col items-center justify-center mt-10'>
            <p className='text-[20px] font-medium'>Controls</p>
            <p className='text-[30px] font-medium mt-10'>Loading.....</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-w-full min-h-screen bg-white flex justify-center items-center'>
        <div className='w-[700px] h-[500px] bg-slate-100 shadow-2xl flex flex-col items-center'>
          <h1 className='mt-10 font-bold text-[25px]'>
            MayCode Editor Monitor
            {/* <span className='text-slate-500'>v0.1.0</span> */}
          </h1>
          <div className='flex flex-col items-center justify-center mt-10'>
            <p className='text-[20px] font-medium'>Controls</p>
            <p className='text-[30px] font-medium mt-10'>{error.error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className='min-h-screen mx-11 flex flex-row items-center justify-center gap-[100px]'>
        <div className='flex items-center flex-col'>
          <h1>Change Control State</h1>
          <form onSubmit={onSubmit}>
            <div className='flex flex-col items-center justify-center mt-8'>
              <Dropdown
                required
                value={selectedControl}
                onChange={(e) => setSelectedControl(e.value)}
                options={list}
                optionLabel='name'
                placeholder='Select a Control'
                className='w-[300px] h-[40px] border-2 border-slate-300 rounded-md px-2 mt-4'
              />

              <Dropdown
                required
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.value)}
                options={status}
                optionLabel='name'
                placeholder='Select Status'
                className='w-[300px] h-[40px] border-2 border-slate-300 rounded-md px-2 mt-4'
              />

              <Button
                type='submit'
                label='Submit'
                className='w-[300px] h-[40px] bg-[#1E90FF] text-white rounded-md mt-4'
              ></Button>
            </div>
          </form>
        </div>

        <div className='flex items-center flex-col'>
          <h1>Existing Controls</h1>
          <div className='flex flex-col items-center justify-center mt-8'>
            {controls?.map((control: any) => {
              return (
                <div
                  key={control.id}
                  className='flex flex-row items-center justify-center gap-[50px] mt-[20px]'
                >
                  <p>{control.name}</p>
                  <p>{control.status ? 'ON' : 'OFF'}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlsPage;
