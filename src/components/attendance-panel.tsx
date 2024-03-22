'use client';

import { useState } from 'react';

import * as Icons from '@/components/icons';
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  ScrollArea,
} from '@/components/ui';
import { Tables } from '@/types/types_db';
import { AttendanceCard } from './attendance-card';

const swimmerLevelFilters = [
  { id: 1, name: 'Toți', value: 'all' },
  { id: 2, name: 'Începători', value: 'beginner' },
  { id: 3, name: 'Avansați', value: 'advanced' },
  { id: 4, name: 'Performanță', value: 'pro' },
];

interface Props {
  students: Tables<'students'>[];
}

export function AttendancePanel({ students }: Props) {
  const [filteredStudents, setFilteredStudents] = useState('');

  const displayedStudents = students.filter((student) =>
    student.full_name.toLowerCase().includes(filteredStudents.toLowerCase()),
  );

  return (
    <>
      <div className="flex justify-between">
        <Input
          placeholder="Filter students..."
          value={filteredStudents}
          onChange={(event) => setFilteredStudents(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto flex h-8">
              <Icons.MixerHorizontal className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Swimmer Level</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {swimmerLevelFilters.map((level) => (
              <DropdownMenuCheckboxItem
                key={level.id}
                className="capitalize"
                checked={level.name === 'All'}
                // onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {level.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className="h-[555px]">
        {displayedStudents?.map((student) => (
          <AttendanceCard key={student.id} student={student} />
        ))}
      </ScrollArea>
    </>
  );
}

export default AttendancePanel;
