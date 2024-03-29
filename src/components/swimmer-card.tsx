'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import * as Icons from '@/components/icons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { createClient } from '@/utils/supabase/client';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
];

const profileFormSchema = z.object({
  // TODO: https://github.com/shadcn-ui/ui/issues/884
  name: z.string().min(3),
  phoneNumber: z
    .string()
    .min(10)
    .max(10)
    .refine((val) => !isNaN(val as unknown as number), {
      message: 'Your phone number contains other characters than digits.',
    }),
  pool: z.string({
    required_error: 'Please select the performance level.',
  }),
  swimmerLevel: z.string({
    required_error: 'Please select the performance level.',
  }),
  medicalCertificate: z
    .instanceof(Blob, { message: 'Medical Certificate is required' })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      'File size should be less than 5 MB.',
    )
    .refine(
      (file) => ALLOWED_FILE_TYPES.includes(file.type),
      'Only .pdf files are allowed',
    ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

export default function SwimmerCard({ student, children }) {
  const [certificateError, setCertificateError] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [studentAttendances, setStudentAttendances] = useState([]);
  const [studentData, setStudentData] = useState({} as any);

  const supabase = createClient();
  const getStudentAttendances = async (studentId: string) => {
    const { data } = await supabase
      .from('attendance_record')
      .select('*')
      .eq('student_id', studentId);

    if (!data) return [];

    const formattedAttendances = data.map((attendance: any) => ({
      id: attendance.id,
      date: new Date(attendance.date),
    }));

    const dates = formattedAttendances.map((attendance) => attendance.date);
    setStudentAttendances(dates);
    getStudentData(studentId);
  };

  // const getInitials = (name: string) => {
  //   const initials = name
  //     .split(" ")
  //     .map((n) => n[0])
  //     .join("");

  //   return initials;
  // };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const getStudentData = async (userId: string): Promise => {
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .select('*')
      .eq('id', userId)
      .single();

    const parentId = studentData?.parent_id;
    let parentName = null;
    if (parentId) {
      const { data: parentData, error: parentError } = await supabase
        .from('users')
        .select('full_name') // Adjust field name as necessary
        .eq('id', parentId)
        .single();

      if (parentError) {
        console.log('Error fetching parent data:', parentError);
      } else {
        parentName = parentData?.full_name;
      }
    }

    error && console.log(error);
    const allData = {
      ...userData,
      ...studentData,
      parent_name: parentName,
    };

    setStudentData(allData);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    // const { name, pool, swimmerLevel, medicalCertificate } = data;
    // const newStudentId = uuidv4();

    // const { data: medicalCertificateData } = await supabaseClient.storage
    //   .from("medical-certificates")
    //   .upload(`mc-${newStudentId}`, medicalCertificate, {
    //     cacheControl: "3600",
    //     upsert: false,
    //   });

    // const updateStudentPoolAction = await supabase.from("students").insert({
    //   id: newStudentId,
    //   full_name: name,
    //   parent_id: userDetails.id,
    //   // phone_number: phoneNumber,
    //   pool: pool,
    //   swimmer_level: swimmerLevel,
    //   medical_certificate_path: medicalCertificateData?.path,
    // });

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <>
    //       <h1>user details</h1>
    //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //       </pre>
    //       <h1>data</h1>
    //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //       </pre>
    //     </>
    //   ),
    // });

    setIsOpenDialog(false);
    router.refresh();
  };

  async function getMedicalCertificate() {
    try {
      const { data: studentData, error } = await supabase
        .from('students')
        .select('medical_certificate_path')
        .eq('id', student.id);

      const medicalCertificatePath = studentData[0]?.medical_certificate_path;

      const { data: medicalCertificateUrl } = await supabase.storage
        .from('medical-certificates')
        .getPublicUrl(medicalCertificatePath);

      window.open(medicalCertificateUrl.publicUrl, '_blank');
    } catch (error) {
      console.error('An error occurred:', error);
      setCertificateError(true);
    }
  }

  return (
    <Dialog
      open={isOpenDialog}
      onOpenChange={() => setIsOpenDialog(!isOpenDialog)}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          style={{
            animationDelay: '0.40s',
            animationFillMode: 'forwards',
          }}
          onClick={() => getStudentAttendances(student.id)}
          className="w-full flex-1 justify-start px-0 py-1.5 text-sm font-[400]"
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <ScrollArea className="max-h-[92vh]">
          <DialogHeader className="mb-6 items-center">
            <Avatar className="mb-2 h-16 w-16">
              <AvatarImage src={`${studentData.avatar_url}`} />
              <AvatarFallback className="text-xl">
                {/* {studentData && getInitials(studentData?.full_name)} */}
              </AvatarFallback>
            </Avatar>
            <DialogTitle>{studentData.full_name}</DialogTitle>
            {/* <DialogDescription>
            Add another student for swimming lessons
          </DialogDescription> */}
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex flex-col justify-between space-y-4">
              {studentData.role === 'student' && (
                <div className="flex items-center">
                  <Icons.User className="h-5 w-5 text-[#3B82F6]" />
                  <p className="ml-2 text-base font-normal">Parent:</p>
                  <p className="ml-2 text-base font-normal leading-none">
                    {`${studentData.parent_name}`}
                  </p>
                </div>
              )}
              <div className="flex items-center">
                <Icons.Phone className="h-5 w-5 text-[#3B82F6]" />
                <p className="ml-2 text-base font-normal">Phone:</p>
                <p className="ml-2 text-base font-normal leading-none">
                  {`${studentData.phone}`}
                </p>
              </div>

              <div className="flex items-center">
                <Icons.Waves className="h-5 w-5 text-[#3B82F6]" />
                <p className="ml-2 text-base font-normal">Pool:</p>
                <p className="ml-2 text-base font-normal leading-none">
                  {studentData.pool}
                </p>
              </div>

              <div className="flex items-center">
                <Icons.GraduationCap className="h-5 w-5 text-[#3B82F6]" />
                <p className="ml-2 text-base font-normal">Class:</p>
                <p className="ml-2 text-base font-normal leading-none">
                  {` ${studentData.swimmer_level}`}
                </p>
              </div>

              {studentData.swimmer_level === 'beginner' && (
                <div className="flex items-center">
                  <Icons.Calendar className="h-5 w-5 text-[#3B82F6]" />
                  <p className="ml-2 text-base font-normal">Lessons left:</p>
                  <p className="ml-2 text-base font-normal leading-none">
                    {studentData.lessons_left}
                  </p>
                </div>
              )}

              <div className="flex items-center">
                <Icons.CalendarCheck className="h-5 w-5 text-[#3B82F6]" />
                <p className="ml-2 text-base font-normal">Expires at:</p>
                <p className="ml-2 text-base font-normal leading-none">
                  add expiration date
                </p>
              </div>
              <p className="text-sm font-medium leading-none">
                Role: {studentData?.role}
              </p>
              <p className="text-sm font-medium leading-none">
                Status: {studentData?.active ? `Active` : `Inactive`}
              </p>

              {/* <AddStudentForm userDetails={userDetails} /> */}
            </div>
          </div>

          <div className="mt-5">
            <Button
              disabled={certificateError}
              onClick={() => getMedicalCertificate()}
            >
              <Icons.Eye />
            </Button>
          </div>
          {/* <Calendar mode="multiple" /> */}
          <Calendar
            mode="multiple"
            selected={studentAttendances}
            className="flex justify-center"
          />
          {/* <Calendar mode="multiple" /> */}
          {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ionut Popescu" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="swimmerLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Performance Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the level of your performance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FALSE">Beginner</SelectItem>
                      <SelectItem value="TRUE">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can request your swimming teacher to promote you
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pool"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pool Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the level of your performance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Cluj-Napoca">Cluj-Napoca</SelectItem>
                      <SelectItem value="Dej">Dej</SelectItem>
                      <SelectItem value="Sancraiu">Sâncraiu</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can request your swimming teacher to promote you
                    <Link href="/examples/forms">email settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="0751 123 456" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicalCertificate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Certificate</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      placeholder="MedicalCertificate.pdf"
                      // Use event.target.files to access the uploaded file
                      onChange={(e) => {
                        // Update the form state with the selected file
                        field.onChange(e.target.files?.[0]);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Please upload your medical certificate in .pdf format.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form> */}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
