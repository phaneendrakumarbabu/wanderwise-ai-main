import { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Home, Activity, Palette, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  activityOptions,
  culturalOptions,
  accommodationOptions,
  seasonOptions,
  budgetOptions,
  durationOptions,
  travelTypeOptions,
  ageGroupOptions
} from '@/data/destinations';
import { UserPreferences } from '@/utils/recommendations';

interface PreferenceFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  isLoading?: boolean;
}

export function PreferenceForm({ onSubmit, isLoading }: PreferenceFormProps) {
  const [name, setName] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [season, setSeason] = useState('');
  const [travelType, setTravelType] = useState('');
  const [accommodation, setAccommodation] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [cultural, setCultural] = useState<string[]>([]);

  const toggleArrayItem = (arr: string[], setArr: (arr: string[]) => void, item: string) => {
    if (arr.includes(item)) {
      setArr(arr.filter(i => i !== item));
    } else {
      setArr([...arr, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      budget,
      duration,
      season,
      travelType,
      accommodation,
      activities,
      cultural
    });
  };

  const isFormValid = budget && duration && season && travelType && activities.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Details */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-serif text-lg font-semibold">About You</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="name" className="text-sm text-muted-foreground">Name (optional)</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="input-travel mt-1"
            />
          </div>
          <div>
            <Label htmlFor="city" className="text-sm text-muted-foreground">Current City</Label>
            <Input
              id="city"
              value={currentCity}
              onChange={(e) => setCurrentCity(e.target.value)}
              placeholder="e.g., Mumbai"
              className="input-travel mt-1"
            />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Age Group</Label>
            <Select value={ageGroup} onValueChange={setAgeGroup}>
              <SelectTrigger className="input-travel mt-1">
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border">
                {ageGroupOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Travel Preferences */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-ocean/10">
            <MapPin className="w-5 h-5 text-ocean" />
          </div>
          <h3 className="font-serif text-lg font-semibold">Travel Preferences</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <span>💰</span> Budget Range *
            </Label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger className="input-travel mt-1">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border">
                {budgetOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" /> Trip Duration *
            </Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="input-travel mt-1">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border">
                {durationOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Preferred Season *
            </Label>
            <Select value={season} onValueChange={setSeason}>
              <SelectTrigger className="input-travel mt-1">
                <SelectValue placeholder="Select season" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border">
                {seasonOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-sm text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" /> Travel Type *
            </Label>
            <Select value={travelType} onValueChange={setTravelType}>
              <SelectTrigger className="input-travel mt-1">
                <SelectValue placeholder="Who are you traveling with?" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border">
                {travelTypeOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Accommodation */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <Home className="w-5 h-5 text-accent" />
          </div>
          <h3 className="font-serif text-lg font-semibold">Accommodation Style</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {accommodationOptions.map(option => (
            <label
              key={option}
              className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                accommodation.includes(option)
                  ? 'bg-primary/10 border-primary'
                  : 'bg-card border-border hover:border-primary/50'
              }`}
            >
              <Checkbox
                checked={accommodation.includes(option)}
                onCheckedChange={() => toggleArrayItem(accommodation, setAccommodation, option)}
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-forest/10">
            <Activity className="w-5 h-5 text-forest" />
          </div>
          <h3 className="font-serif text-lg font-semibold">Activity Interests *</h3>
          <span className="text-xs text-muted-foreground">(Select at least one)</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {activityOptions.map(option => (
            <label
              key={option}
              className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                activities.includes(option)
                  ? 'bg-primary/10 border-primary'
                  : 'bg-card border-border hover:border-primary/50'
              }`}
            >
              <Checkbox
                checked={activities.includes(option)}
                onCheckedChange={() => toggleArrayItem(activities, setActivities, option)}
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Cultural Interests */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-sunset/10">
            <Palette className="w-5 h-5 text-sunset" />
          </div>
          <h3 className="font-serif text-lg font-semibold">Cultural Interests</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {culturalOptions.map(option => (
            <label
              key={option}
              className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                cultural.includes(option)
                  ? 'bg-primary/10 border-primary'
                  : 'bg-card border-border hover:border-primary/50'
              }`}
            >
              <Checkbox
                checked={cultural.includes(option)}
                onCheckedChange={() => toggleArrayItem(cultural, setCultural, option)}
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <Button
          type="submit"
          variant="hero"
          size="xl"
          disabled={!isFormValid || isLoading}
          className="min-w-64"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Finding Perfect Matches...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Get Personalized Recommendations
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
