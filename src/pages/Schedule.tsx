
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MapPin, Plus, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const mockEvents = [
  {
    id: '1',
    title: 'Sprint Planning Meeting',
    time: '09:00 AM - 10:30 AM',
    attendees: ['Sarah Johnson', 'David Kim', 'Mike Chen'],
    location: 'Conference Room A',
    type: 'meeting',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'API Integration Review',
    time: '02:00 PM - 03:00 PM',
    attendees: ['Lisa Wang', 'John Doe'],
    location: 'Virtual',
    type: 'review',
    color: 'bg-green-500'
  },
  {
    id: '3',
    title: 'Design System Workshop',
    time: '04:00 PM - 05:30 PM',
    attendees: ['Emily Rodriguez', 'Sarah Johnson'],
    location: 'Design Studio',
    type: 'workshop',
    color: 'bg-purple-500'
  }
];

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();
  const startOfCurrentWeek = startOfWeek(currentDate);
  
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));
  
  const goToPreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };
  
  const goToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const goBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="h-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={goBackToDashboard}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
              Schedule
            </h2>
            <p className="text-slate-600 dark:text-slate-400">Manage your meetings and events</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="font-medium text-lg">
              {format(startOfCurrentWeek, 'MMM d')} - {format(addDays(startOfCurrentWeek, 6), 'MMM d, yyyy')}
            </span>
            <Button variant="outline" size="sm" onClick={goToNextWeek}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>
      
      {/* Week Calendar Grid */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {weekDays.map((day, index) => (
          <Card key={index} className={`${isSameDay(day, new Date()) ? 'ring-2 ring-blue-500' : ''}`}>
            <CardHeader className="pb-2">
              <div className="text-center">
                <div className="text-sm text-slate-500 font-medium">
                  {format(day, 'EEE')}
                </div>
                <div className={`text-2xl font-bold ${isSameDay(day, new Date()) ? 'text-blue-600' : ''}`}>
                  {format(day, 'd')}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {isSameDay(day, new Date()) && mockEvents.map((event) => (
                  <div key={event.id} className={`p-2 rounded text-white text-xs ${event.color}`}>
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="opacity-90">{event.time.split(' - ')[0]}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-sm transition-shadow">
                <div className={`w-1 h-16 rounded-full ${event.color}`} />
                
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{event.title}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {event.attendees.length} attendees
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Badge variant="outline" className="text-xs">
                    {event.type}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedule;
