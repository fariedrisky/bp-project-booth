// pages/dashboard.tsx
import React from "react";
import { Button } from "@/components/ui/Button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

const Dashboard = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Wedding Photo Booth - Sarah & John",
      type: "Basic Booth",
      date: "2024-03-15",
      status: "Booked",
    },
    {
      id: 2,
      title: "Corporate Event - Tech Company",
      type: "360 Spin Booth",
      date: "2024-03-18",
      status: "Pending Payment",
    },
    {
      id: 3,
      title: "Birthday Party - Sweet 17",
      type: "Mini Booth",
      date: "2024-03-20",
      status: "Confirmed",
    },
  ];

  return (
    <main className="flex-1 overflow-auto p-6">
      {/* Welcome Card */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600">
          <CardContent className="p-6">
            <h2 className="mb-2 text-2xl font-bold text-white">
              Welcome back, Admin!
            </h2>
            <p className="text-purple-100">
              Manage your photo booth bookings and crew efficiently
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">
              Total Bookings
            </h3>
            <p className="text-2xl font-bold">248</p>
            <span className="text-xs text-green-500">
              ↑ 12% from last month
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">
              Pending Payments
            </h3>
            <p className="text-2xl font-bold">12</p>
            <span className="text-xs text-yellow-500">4 need review</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Active Crew</h3>
            <p className="text-2xl font-bold">18</p>
            <span className="text-xs text-blue-500">3 on duty today</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500">
              This Month Revenue
            </h3>
            <p className="text-2xl font-bold">Rp 24.5M</p>
            <span className="text-xs text-green-500">↑ 8% from last month</span>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <div className="flex gap-2">
          <Button size="icon" variant="outline">
            <ChevronLeft size={16} />
          </Button>
          <Button size="icon" variant="outline">
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {upcomingEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    event.status === "Booked"
                      ? "bg-green-100 text-green-600"
                      : event.status === "Pending Payment"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {event.status}
                </span>
                <span className="text-sm text-gray-500">{event.date}</span>
              </div>
              <h3 className="mb-1 font-medium">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.type}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
