"use client";

import CommonHeader from "@/components/common/common-header";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

// Zod validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .max(500, "Message must be less than 500 characters")
    .optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

type Props = {};

export default function ContactPage({}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your API
      
     
      form.reset();
    } catch (error) {
     
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-white">
      <CommonHeader title="Contact Us" />

      <section className="container mx-auto px-4 py-16 font-lora">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 py-8 border-b border-muted">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 tablet-lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-muted/50 rounded-2xl border border-muted shadow-sm p-6 tablet:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Send us a message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we&apos;ll get back to you shortly.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel >
                          Your Name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className="h-12 "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage  />
                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel >
                          Email Address *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="h-12 "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage  />
                      </FormItem>
                    )}
                  />

                  {/* Subject Field */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel >
                          Subject *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What is this regarding?"
                            className="h-12 "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage  />
                      </FormItem>
                    )}
                  />

                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel >
                          Message (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us more about your inquiry..."
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage  />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant={'primary'}
                      className="flex items-center w-full h-12 justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Welcome Message */}
              <div className="bg-muted/50 rounded-2xl border border-muted shadow-sm  p-6 tablet-lg:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  We&apos;d love to hear from you
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We love to hear from you on our customer service, merchandise,
                  website or any topics you want to share with us. Your comments and
                  suggestions will be appreciated.
                </p>
                <div className="w-16 h-1 bg-gradient-to-r bg-main rounded-full"></div>
              </div>

              {/* Contact Details */}
              <div className="bg-muted/50 rounded-2xl border border-muted shadow-sm p-6  tablet-lg:p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-main/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-main" />
                    </div>
                    <div>
                      <h4 className="font-semibold  mb-1">Address</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Floranza Fashion Boutique<br />
                        14/934 Church Road<br />
                        Thiruvambady, Calicut – 673603
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-main/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5  text-main" />
                    </div>
                    <div>
                      <h4 className="font-semibold  mb-1">Phone</h4>
                      <p className="text-muted-foreground">+91 9539006690</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-main/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-main" />
                    </div>
                    <div>
                      <h4 className="font-semibold  mb-1">Email</h4>
                      <p className="text-muted-foreground">support@floranzafashion.com</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-main/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-main" />
                    </div>
                    <div>
                      <h4 className="font-semibold  mb-1">Hours</h4>
                      <p className="text-muted-foreground">Everyday 9:00 AM – 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

            
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}