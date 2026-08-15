import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  FaArrowRight,
  FaBrain,
  FaCheckCircle,
  FaFileAlt,
  FaMagic,
  FaRocket,
  FaStar,
} from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#111214] text-white">

      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative max-w-full overflow-hidden bg-[#111214]">

        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[#6D3F82]/40 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 top-20 h-[32rem] w-[32rem] rounded-full bg-[#A83E91]/30 blur-[125px]" />

        <div className="pointer-events-none absolute bottom-[-18%] left-[28%] h-80 w-80 rounded-full bg-[#FF8A5B]/20 blur-[100px]" />

        <div className="pointer-events-none absolute right-[25%] top-[30%] h-72 w-72 rounded-full bg-[#D85B9B]/15 blur-[110px]" />

        <div className="container relative z-10 mx-auto px-6 py-20 lg:py-24">

          <div className="grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] xl:gap-14">

            {/* =================================================
                LEFT CONTENT
            ================================================= */}
            <div className="max-w-xl">

              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D85B9B]/35 bg-[#D85B9B]/10 px-4 py-2 text-[#F4D6A4]">

                <FaMagic className="text-sm" />

                <span className="text-xs font-semibold sm:text-sm">
                  AI-Powered Resume Builder
                </span>

              </div>

              {/* Heading */}
              <h1 className="text-4xl font-black leading-[1.08] text-white md:text-5xl lg:text-6xl">
                Build a Resume That
                <span className="block text-[#D85B9B]">
                  Gets You Noticed.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65 md:text-lg">
                Describe your skills, experience, and career goals. Our AI
                transforms your information into a professional,
                job-ready resume in minutes.
              </p>

              {/* Buttons */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                <Link
                  to="/generate-resume"
                  className="btn rounded-xl border-0 bg-[#D85B9B] px-7 text-sm text-white shadow-[0_12px_30px_rgba(216,91,155,0.28)] transition-transform hover:scale-[1.03] hover:bg-[#BE477F]"
                >
                  Create My Resume
                  <FaArrowRight />
                </Link>

                <a
                  href="#how-it-works"
                  className="btn btn-outline rounded-xl border-white/25 px-7 text-sm text-white hover:border-white/40 hover:bg-white/10"
                >
                  See How It Works
                </a>

              </div>

              {/* Trust Points */}
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-white/55 md:text-sm">

                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#F4D6A4]" />
                  AI Generated
                </div>

                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#F4D6A4]" />
                  Professional Format
                </div>

                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#F4D6A4]" />
                  Easy to Edit
                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT RESUME PREVIEW
            ================================================= */}
            <div className="relative flex min-w-0 items-center justify-center py-10 lg:justify-end lg:py-14">

              {/* Main Glow */}
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-[#6D3F82]/25 blur-[90px]" />

              {/* Pink Glow */}
              <div className="pointer-events-none absolute right-0 top-10 h-80 w-80 rounded-full bg-[#D85B9B]/20 blur-[105px]" />

              {/* Coral Glow */}
              <div className="pointer-events-none absolute bottom-[-30px] left-10 h-64 w-64 rounded-full bg-[#FF8A5B]/20 blur-[90px]" />

              {/* Resume Wrapper */}
              <div className="relative w-full max-w-[700px] xl:max-w-[780px]">

                {/* Glow Around Resume */}
                <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-[#D85B9B]/30 via-transparent to-[#FF8A5B]/20 blur-2xl" />

                {/* Resume */}
                <div className="relative overflow-visible rounded-[28px] border border-white/80 bg-white p-5 shadow-[0_35px_100px_rgba(0,0,0,0.50)] rotate-[1deg] transition-transform duration-500 hover:rotate-0 md:p-7">

                  {/* Resume Header */}
                  <div className="flex items-start justify-between border-b border-[#E7DDE8] pb-5">

                    <div className="min-w-0">

                      <div className="h-5 w-44 rounded-md bg-[#211A36]" />

                      <div className="mt-3 h-2.5 w-56 max-w-full rounded-full bg-[#D9D4DE]" />

                      <div className="mt-4 flex flex-wrap gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-[#E8E3EA]" />
                        <div className="h-1.5 w-20 rounded-full bg-[#E8E3EA]" />
                        <div className="h-1.5 w-14 rounded-full bg-[#E8E3EA]" />
                      </div>

                    </div>

                    {/* Resume Icon */}
                    <div className="ml-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D85B9B]/10 ring-8 ring-[#D85B9B]/5">
                      <FaFileAlt className="text-xl text-[#D85B9B]" />
                    </div>

                  </div>

                  {/* Resume Body */}
                  <div className="mt-6 grid grid-cols-12 gap-6">

                    {/* Main Column */}
                    <div className="col-span-8 space-y-6">

                      {/* Summary */}
                      <div>

                        <div className="mb-3 h-2.5 w-24 rounded-full bg-[#D85B9B]" />

                        <div className="space-y-2.5">
                          <div className="h-2 w-full rounded-full bg-[#E6E1E8]" />
                          <div className="h-2 w-11/12 rounded-full bg-[#E6E1E8]" />
                          <div className="h-2 w-10/12 rounded-full bg-[#E6E1E8]" />
                          <div className="h-2 w-8/12 rounded-full bg-[#E6E1E8]" />
                        </div>

                      </div>

                      {/* Experience */}
                      <div>

                        <div className="mb-3 h-2.5 w-28 rounded-full bg-[#D85B9B]" />

                        <div className="mb-4">

                          <div className="mb-2.5 h-2.5 w-40 rounded-full bg-[#211A36]/75" />

                          <div className="space-y-2">
                            <div className="h-2 w-full rounded-full bg-[#E6E1E8]" />
                            <div className="h-2 w-11/12 rounded-full bg-[#E6E1E8]" />
                            <div className="h-2 w-9/12 rounded-full bg-[#E6E1E8]" />
                          </div>

                        </div>

                        <div>

                          <div className="mb-2.5 h-2.5 w-32 rounded-full bg-[#211A36]/75" />

                          <div className="space-y-2">
                            <div className="h-2 w-full rounded-full bg-[#E6E1E8]" />
                            <div className="h-2 w-10/12 rounded-full bg-[#E6E1E8]" />
                          </div>

                        </div>

                      </div>

                      {/* Projects */}
                      <div>

                        <div className="mb-3 h-2.5 w-20 rounded-full bg-[#D85B9B]" />

                        <div className="space-y-2.5">
                          <div className="h-2 w-full rounded-full bg-[#E6E1E8]" />
                          <div className="h-2 w-11/12 rounded-full bg-[#E6E1E8]" />
                          <div className="h-2 w-8/12 rounded-full bg-[#E6E1E8]" />
                        </div>

                      </div>

                    </div>

                    {/* Sidebar */}
                    <div className="col-span-4 space-y-6 border-l border-[#E7DDE8] pl-5">

                      {/* Skills */}
                      <div>

                        <div className="mb-3 h-2.5 w-16 rounded-full bg-[#D85B9B]" />

                        <div className="flex flex-wrap gap-2">
                          <div className="h-6 w-14 rounded-lg bg-[#F0EAF1]" />
                          <div className="h-6 w-18 rounded-lg bg-[#F0EAF1]" />
                          <div className="h-6 w-12 rounded-lg bg-[#F0EAF1]" />
                          <div className="h-6 w-20 rounded-lg bg-[#F0EAF1]" />
                          <div className="h-6 w-16 rounded-lg bg-[#F0EAF1]" />
                        </div>

                      </div>

                      {/* Education */}
                      <div>

                        <div className="mb-3 h-2.5 w-20 rounded-full bg-[#D85B9B]" />

                        <div className="space-y-2.5">
                          <div className="h-2 w-full rounded-full bg-[#E6E1E8]" />
                          <div className="h-2 w-10/12 rounded-full bg-[#E6E1E8]" />
                          <div className="h-2 w-11/12 rounded-full bg-[#E6E1E8]" />
                        </div>

                      </div>

                      {/* Certifications */}
                      <div>

                        <div className="mb-3 h-2.5 w-20 rounded-full bg-[#D85B9B]" />

                        <div className="space-y-2.5">
                          <div className="h-2 w-9/12 rounded-full bg-[#E6E1E8]" />
                          <div className="h-2 w-full rounded-full bg-[#E6E1E8]" />
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* AI Optimized Badge */}
                  <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl border border-[#E7DDE8] bg-white px-4 py-3 text-[#211A36] shadow-[0_18px_50px_rgba(0,0,0,0.30)] sm:-left-7">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D85B9B] text-white shadow-[0_8px_20px_rgba(216,91,155,0.30)]">
                      <FaBrain />
                    </div>

                    <div>
                      <p className="text-xs font-bold sm:text-sm">
                        AI Optimized
                      </p>

                      <p className="text-[10px] text-[#6F6682] sm:text-xs">
                        Professional Resume
                      </p>
                    </div>

                  </div>

                  {/* Job Ready Badge */}
                  <div className="absolute -right-3 -top-5 hidden items-center gap-2 rounded-full border border-white/80 bg-[#211A36] px-3 py-1.5 text-[10px] font-semibold text-[#F4D6A4] shadow-xl sm:flex">

                    <FaCheckCircle className="text-[#D85B9B]" />

                    Job Ready

                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}
      <section className="border-y border-white/10 bg-[#17181C]">

        <div className="container mx-auto px-6 py-9">

          <div className="grid grid-cols-2 gap-7 text-center md:grid-cols-4">

            <div>
              <h3 className="text-2xl font-bold text-[#D85B9B]">
                AI
              </h3>

              <p className="mt-1 text-xs text-white/50">
                Powered Creation
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">
                10x
              </h3>

              <p className="mt-1 text-xs text-white/50">
                Faster Resume Building
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">
                100%
              </h3>

              <p className="mt-1 text-xs text-white/50">
                Editable Content
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">
                1
              </h3>

              <p className="mt-1 text-xs text-white/50">
                Simple Workflow
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}
      <section
        id="features"
        className="bg-[#111214] py-20"
      >

        <div className="container mx-auto px-6">

          <div className="mx-auto mb-12 max-w-2xl text-center">

            <span className="text-xs font-semibold uppercase tracking-wider text-[#D85B9B]">
              Powerful Features
            </span>

            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Everything You Need to Build a Better Resume
            </h2>

            <p className="mt-4 text-base leading-relaxed text-white/60">
              Create a polished resume without spending hours formatting
              and rewriting your information.
            </p>

          </div>

          <div className="grid gap-7 md:grid-cols-3">

            {/* Feature 1 */}
            <div className="group rounded-2xl border border-white/10 bg-[#17181C] transition-all duration-300 hover:border-[#D85B9B]/40 hover:shadow-[0_20px_50px_rgba(216,91,155,0.10)]">

              <div className="p-7">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D85B9B]/10 text-xl text-[#D85B9B] transition-transform group-hover:scale-110">
                  <FaBrain />
                </div>

                <h3 className="mt-4 text-xl font-bold text-white">
                  AI-Powered Generation
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Simply describe yourself and let AI organize your
                  information into a professional resume structure.
                </p>

              </div>

            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border border-white/10 bg-[#17181C] transition-all duration-300 hover:border-[#F4D6A4]/40 hover:shadow-[0_20px_50px_rgba(244,214,164,0.08)]">

              <div className="p-7">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4D6A4]/10 text-xl text-[#F4D6A4] transition-transform group-hover:scale-110">
                  <FaFileAlt />
                </div>

                <h3 className="mt-4 text-xl font-bold text-white">
                  Professional Structure
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Get organized sections for your skills, education,
                  experience, projects, achievements, and more.
                </p>

              </div>

            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border border-white/10 bg-[#17181C] transition-all duration-300 hover:border-[#FF8A5B]/40 hover:shadow-[0_20px_50px_rgba(255,138,91,0.08)]">

              <div className="p-7">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF8A5B]/10 text-xl text-[#FF8A5B] transition-transform group-hover:scale-110">
                  <FaRocket />
                </div>

                <h3 className="mt-4 text-xl font-bold text-white">
                  Easy to Customize
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Review the generated information, edit anything you
                  want, and create a resume that represents you.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section
        id="how-it-works"
        className="border-y border-white/10 bg-[#17181C] py-20"
      >

        <div className="container mx-auto px-6">

          <div className="mb-14 text-center">

            <span className="text-xs font-semibold uppercase tracking-wider text-[#D85B9B]">
              Simple Process
            </span>

            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Create Your Resume in 3 Steps
            </h2>

          </div>

          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">

            {/* Step 1 */}
            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D85B9B] text-xl font-bold text-white shadow-[0_10px_30px_rgba(216,91,155,0.25)]">
                1
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">
                Describe Yourself
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Enter your education, skills, experience, projects, and
                career goals.
              </p>

            </div>

            {/* Step 2 */}
            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D85B9B] text-xl font-bold text-white shadow-[0_10px_30px_rgba(216,91,155,0.25)]">
                2
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">
                Let AI Build It
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Our AI organizes your information into a structured
                professional resume.
              </p>

            </div>

            {/* Step 3 */}
            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D85B9B] text-xl font-bold text-white shadow-[0_10px_30px_rgba(216,91,155,0.25)]">
                3
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">
                Review & Customize
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Review your generated resume, make changes, and create
                your final version.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          TESTIMONIAL
      ===================================================== */}
      <section className="bg-[#111214] py-20">

        <div className="container mx-auto px-6">

          <div className="mb-12 text-center">

            <span className="text-xs font-semibold uppercase tracking-wider text-[#D85B9B]">
              User Experience
            </span>

            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Built to Make Resume Creation Easier
            </h2>

          </div>

          <div className="mx-auto max-w-3xl">

            <div className="rounded-2xl border border-white/10 bg-[#17181C] shadow-[0_20px_65px_rgba(0,0,0,0.25)]">

              <div className="p-8 text-center md:p-10">

                <div className="mb-5 flex justify-center gap-1 text-[#F4D6A4]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <blockquote className="text-lg font-medium leading-relaxed text-white/85 md:text-xl">
                  "Describe your experience once and let AI turn it into a
                  professional resume structure."
                </blockquote>

                <div className="mt-6">

                  <p className="text-sm font-bold text-white">
                    AI Resume Builder
                  </p>

                  <p className="mt-1 text-xs text-white/45">
                    Simple. Professional. AI-powered.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#D85B9B] py-20 text-white">

        <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-[#6D3F82]/30 blur-[90px]" />

        <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#FF8A5B]/25 blur-[100px]" />

        <div className="container relative z-10 mx-auto px-6 text-center">

          <div className="mx-auto max-w-3xl">

            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              <FaMagic />
            </div>

            <h2 className="text-3xl font-black md:text-4xl">
              Ready to Build Your Resume?
            </h2>

            <p className="mt-4 text-base leading-relaxed opacity-90 md:text-lg">
              Turn your skills and experience into a professional resume
              with the help of AI.
            </p>

            <Link
              to="/generate-resume"
              className="btn mt-7 rounded-xl border-none bg-[#F4D6A4] px-9 text-sm text-[#211A36] shadow-lg hover:bg-white"
            >
              Start Building Now
              <FaArrowRight />
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="border-t border-white/10 bg-[#17181C]">

        <div className="container mx-auto px-6 py-12">

          <div className="grid gap-10 md:grid-cols-3">

            {/* Brand */}
            <div>

              <Link
                to="/"
                className="flex items-center gap-3 text-lg font-bold text-white"
              >

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D85B9B] text-white">
                  <FaBrain />
                </div>

                Resume<span className="text-[#D85B9B]">AI</span>

              </Link>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
                Build professional resumes faster with AI-powered resume
                generation.
              </p>

            </div>

            {/* Product */}
            <div>

              <h3 className="mb-4 text-sm font-bold text-white">
                Product
              </h3>

              <div className="flex flex-col gap-3 text-sm text-white/50">

                <a
                  href="#features"
                  className="transition-colors hover:text-[#D85B9B]"
                >
                  Features
                </a>

                <a
                  href="#how-it-works"
                  className="transition-colors hover:text-[#D85B9B]"
                >
                  How It Works
                </a>

                <Link
                  to="/generate-resume"
                  className="transition-colors hover:text-[#D85B9B]"
                >
                  Create Resume
                </Link>

              </div>

            </div>

            {/* About */}
            <div>

              <h3 className="mb-4 text-sm font-bold text-white">
                About
              </h3>

              <div className="flex flex-col gap-3 text-sm text-white/50">

                <a
                  href="#"
                  className="transition-colors hover:text-[#D85B9B]"
                >
                  About Us
                </a>

                <a
                  href="#"
                  className="transition-colors hover:text-[#D85B9B]"
                >
                  Privacy Policy
                </a>

                <a
                  href="#"
                  className="transition-colors hover:text-[#D85B9B]"
                >
                  Terms of Service
                </a>

              </div>

            </div>

          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/35">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </div>

        </div>

      </footer>

    </div>
  );
};

export default LandingPage;