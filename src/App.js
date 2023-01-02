import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from './images/flytick.png';
import Swal from 'sweetalert2'

function App() {
  const {id} = useParams();
  const [ data, setData ] = useState();

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const dateConvert = (strDate) => {
    return new Date(strDate).toString().replace(' GMT+0700 (Western Indonesia Time)', '');
  }

  let indIDR = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
  });

  const handleVerification = async (e) => {
    axios.defaults.headers['authorization'] = token;
    e.preventDefault();
    const response = await axios.put(`https://flytick-dev.up.railway.app/api/ticket/verify/${id}`);

    // return response.data;
    Swal.fire(response.data.message);
    // console.log(response.data.message);
    // navigate(`/admin/verification-status/${id}`, { state: { data: response.data }});
  }

  useEffect(() => {
    const fetchVerivication = async () => {
      if(!token) {
        navigate(`/login/${id}`);
      }
      const response = await axios.get(`https://flytick-dev.up.railway.app/api/ticket/${id}`, {
        headers: {
          Authorization : token
        }
      });
      setData(response.data);
      return response.data;
    }

    fetchVerivication();
  }, [id, navigate, token]);

  console.log(data);

  return (
    <div className="App max-w-3xl sm:mx-auto p-5 shadow-lg m-5 rounded-lg border-[1px] border-solid border-slate-100">
      <h1 className='text-green-600 font-bold text-3xl'>Ticket Verification</h1>
      <div className='flex justify-between mt-5'>
        <div className='flex flex-col justify-between font-bold items-start'>
          <img src={logo} alt='logo.png' srcset="" className='w-28'/>
          <p className='text-base'>FlyTick App</p>
        </div>
        <div className='flex flex-col items-end'>
          <p className='text-sm'>Ticket Number</p>
          <p className='text-base'>{data?.data.ticketData.ticket_number}</p>
        </div>
      </div>
      <div className='flex flex-col gap-3 sm:flex-row justify-between mt-5'>
        <div className='flex flex-col text-start'>
          <p className='font-semibold'>Order Detail</p>
          <table className='border-collapse'>
            <tbody>
              <tr className='align-top'>
                <td className='content-start'>Payment Date</td>
                <td>:</td>
                <td>{dateConvert(data?.data.transactionData.paid_time)}</td>
              </tr>
              <tr className='align-top'>
                <td>Invoice Number</td>
                <td>:</td>
                <td>{data?.data.transactionData.invoice_number}</td>
              </tr>
              <tr className='align-top'>
                <td>Total Payment</td>
                <td>:</td>
                <td>{indIDR.format(data?.data.scheduleData.cost)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='flex flex-col text-start'>
          <p className='font-semibold'>Buyer Detail</p>
          <table>
            <tbody>
              <tr>
                <td className='content-start'>Name</td>
                <td>:</td>
                <td>{data?.data.userData.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>:</td>
                <td>{data?.data.userData.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='mt-5 border border-gray-500 border-solid w-full'>
        <div className='flex sm:justify-between w-full'>
          <div className='flex flex-row justify-between sm:w-2/3 border border-gray-500 border-solid sm:px-5 p-2 w-3/5'>
            <div className='text-xs'>Flight No.</div>
            <div className='text-sm'>{data?.data.flightData.code} | {data?.data.flightData.class}</div>
          </div>
          <div className='flex flex-row justify-between sm:w-1/3 border border-gray-500 border-solid sm:px-5 p-2 w-2/5'>
            <div className='text-xs'>Seat No.</div>
            <div className='text-sm'>{data?.data.ticketData.seat_number} | {data?.data.ticketData.type}</div>
          </div>
        </div>
        <div className='flex w-full'>
          <div className='border w-1/2 sm:w-2/5 border-solid border-gray-500 p-2'>
            <div className='flex justify-end text-xs mb-2'>
              Passenger Data
            </div>
            <div className='flex w-full'>
              <div className='flex flex-col gap-3 w-fit items-start text-xs'>
                <span>Name</span>
                <span>NIK</span>
                <span>Telp</span>
                <span>PassportNo.</span>
              </div>
              <div className='flex flex-col gap-3 items-end text-sm w-full'>
                <span>{data?.data.passengerData.name}</span>
                <span>{data?.data.passengerData.nik}</span>
                <span>{data?.data.passengerData.telp}</span>
                <span>{data?.data.passengerData.no_passport == null ? '-' : data?.data.passengerData.no_passport}</span>
              </div>
            </div>
          </div>
          <div className='border w-1/2 sm:w-3/5 border-solid border-gray-500 p-2'>
            <div className='flex justify-end text-xs mb-2'>
              Passenger Data
            </div>
            <div className='flex flex-col text-sm items-start'>
              <p className='text-xs font-semibold'>Departure</p>
              <p>{data?.data.fromAirportData.name} {`(${data?.data.fromAirportData.code})`}</p>
              <p>[ {dateConvert(data?.data.scheduleData.departure_time)} ]</p>
              <p className='text-xs mt-1 font-semibold'>Arrival</p>
              <p>{data?.data.toAirportData.name} {`(${data?.data.toAirportData.code})`}</p>
              <p>[ {dateConvert(data?.data.scheduleData.arrival_time)} ]</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button type="" onClick={handleVerification} className='w-full rounded-full bg-green-200 text-green-600 text-center py-2 mt-3 font-bold text-lg'>Verify</button>
      </div>
    </div>
  );
}

export default App;
