import { getData } from "@/api/apiService";
import { useState } from "react";

const useFetchTimes = () => {
  const [timesData, setTimesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //status "na cekanju"/"kasno otkazao"/"dosao"/"nije dosao"
  const getEventsForSelectedDay = [
    {
      id: "jhjhafjkafHSSasdjhakjdhakdhaskjd",
      name: "Fade hairCut",
      startTime: "09:00",
      endTime: "10:00",
      status: "dosao",
      reservation: {
        id: "dasdkjasdkd",
        note: "Imam mladež na potiljku. Molim da se ne dira.",
        user: "Zdravo Colic",
      },
    },
    {
      id: "123abc456def",
      name: "Beard Trim",
      startTime: "10:30",
      endTime: "11:00",
      status: "dosao",
      reservation: {
        id: "res01",
        note: "Preferiram kraću bradu, ne previše zaobljeno.",
        user: "Milan Petrović",
      },
    },
    {
      id: "789ghi012jkl",
      name: "Buzz Cut",
      startTime: "11:00",
      endTime: "12:00",
      status: "nije dosao",
      reservation: {
        id: "res02",
        note: "Samo minival na jedinicu.",
        user: "Nikola Jovanović",
      },
    },
    {
      id: "345mno678pqr",
      name: "Skin Fade",
      startTime: "12:00",
      endTime: "13:00",
      status: "dosao",
      reservation: {
        id: "res03",
        note: "Zadnji put si uradio super, isto kao tada.",
        user: "Aleksa Mitrović",
      },
    },

    {
      id: "567yzA890BCD",
      name: "Taper Fade",
      startTime: "14:30",
      endTime: "15:00",
      status: "dosao",
      reservation: {
        id: "res05",
        note: "Molim bez brijanja, samo makazama.",
        user: "Stefan Vasić",
      },
    },
    {
      id: "EFG123HIJ456",
      name: "Hair Coloring",
      startTime: "16:00",
      endTime: "16:30",
      status: "na cekanju",
      reservation: {
        id: "res06",
        note: "Imam alergiju na određene boje, nosim svoju.",
        user: "Ivana Simić",
      },
    },
    {
      id: "KLM789NOP012",
      name: "Hair Wash & Trim",
      startTime: "16:30",
      endTime: "17:30",
      status: "na cekanju",
      reservation: {
        id: "res07",
        note: "Na celavo, bree",
        user: "Dragan Nikolić",
      },
    },
    {
      id: "QRS345TUV678",
      name: "Undercut",
      startTime: "17:30",
      endTime: "18:00",
      status: "na cekanju",
      reservation: {
        id: "res08",
        note: "Zadrži dužinu gore, samo srediti strane.",
        user: "Marija Todorović",
      },
    },
    {
      id: "WXY901ZAB234",
      name: "Straight Razor Shave",
      startTime: "18:30",
      endTime: "19:00",
      status: "na cekanju",
      reservation: {
        id: "res09",
        note: "Ako ne stignem, javljam sigurno.",
        user: "Nenad Kovačević",
      },
    },
    {
      id: "CDE567FGH890",
      name: "Mohawk Style",
      startTime: "19:30",
      endTime: "20:00",
      status: "na cekanju",
      reservation: {
        id: "res10",
        note: "Radimo mohawk kao prošli put, fotku ću doneti.",
        user: "Tamara Ristić",
      },
    },
  ];

  const fetchTimes = async (selectedDate: any) => {
    setIsLoading(true);
    setError(null);
    console.log("first", selectedDate);
    if (!selectedDate) {
      setIsLoading(false);
      return;
    }

    try {
      await getData("/admin/availabilities", {
        dateValue: selectedDate,
      });
      setIsLoading(false);
      setTimesData(getEventsForSelectedDay);
      // await new Promise(resolve => setTimeout(resolve, 700));
      // const tasksForDay = [];
      // const baseMoment = moment(selectedDate);
      // const numTasks = Math.floor(Math.random() * 5) + 2;
      // const possibleStartHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]; // Common work hours
      // for (let i = 0; i < numTasks; i++) {
      //   const startHour = possibleStartHours[Math.floor(Math.random() * possibleStartHours.length)];
      //   const startMinute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45 minutes
      //   const startTimeMoment = baseMoment.clone().hour(startHour).minute(startMinute).second(0);
      //   const durationMinutes = Math.floor(Math.random() * 10) * 15 + 30; // 30, 45, ..., 120 minutes
      //   const endTimeMoment = startTimeMoment.clone().add(durationMinutes, 'minutes');

      //   tasksForDay.push({
      //     id: `${selectedDate}-${i}-${startTimeMoment.format('HHmm')}`,
      //     title: `${['Meeting', 'Coding', 'Break', 'Planning', 'Review'][Math.floor(Math.random() * 5)]}`,
      //     description: `Details for Task ${i + 1} on ${selectedDate}`,
      //     startTime: startTimeMoment.format('HH:mm'),
      //     endTime: endTimeMoment.format('HH:mm'),
      //     status: ['completed', 'pending', 'in-progress'][Math.floor(Math.random() * 3)],
      //   });
      // }

      // tasksForDay.sort((a, b) => {
      //   const timeA = moment(a.startTime, 'HH:mm');
      //   const timeB = moment(b.startTime, 'HH:mm');
      //   return timeA.diff(timeB);
      // });

      // setTimesData(prevData => ({
      //   ...prevData,
      //   [selectedDate]: tasksForDay,
      // }));

      // console.log("tasksForDay",tasksForDay)
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { timesData, isLoading, error, fetchTimes, getEventsForSelectedDay };
};

export default useFetchTimes;
