
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  UserPlus, 
  Search, 
  Settings, 
  Crown,
  Shield,
  User,
  Mail,
  MapPin,
  Calendar,
  Activity
} from 'lucide-react';
import { mockUsers, DEVELOPER_INFO } from '@/data/mockData';

export function TeamManagement() {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'manager':
        return <Crown className="w-4 h-4" />;
      case 'developer':
        return <Shield className="w-4 h-4" />;
      case 'designer':
        return <User className="w-4 h-4" />;
      case 'qa':
        return <Activity className="w-4 h-4" />;
      case 'admin':
        return <Settings className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'manager':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'developer':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'designer':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'qa':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Team Management</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage team members and their roles</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Members ({filteredUsers.length})
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredUsers.map((user) => {
              const isCreator = user.email === DEVELOPER_INFO.email;
              
              return (
                <div key={user.id} className={`p-4 border rounded-lg transition-all ${
                  isCreator 
                    ? 'border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20' 
                    : 'border-slate-200 dark:border-slate-700'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className={`h-12 w-12 ${
                        isCreator ? 'ring-2 ring-blue-500' : ''
                      }`}>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className={
                          isCreator 
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                            : 'bg-slate-100 dark:bg-slate-800'
                        }>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {user.name}
                          </h3>
                          {isCreator && (
                            <Crown className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Mail className="w-3 h-3" />
                          <span>{user.email}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {getRoleIcon(user.role)}
                            <span className="ml-1 capitalize">{user.role}</span>
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {user.department}
                          </Badge>
                          {isCreator && (
                            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs">
                              🏆 Project Creator
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {isCreator && (
                    <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
                      <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                        <Shield className="w-4 h-4" />
                        <span className="font-medium">Original Developer & Project Creator</span>
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Full system access and ownership. Created and developed this project.
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-blue-600 dark:text-blue-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{DEVELOPER_INFO.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {DEVELOPER_INFO.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs px-1 py-0">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
