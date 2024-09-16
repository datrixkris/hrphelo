import Button from "@/app/components/Button";
import React from "react";

const OnboardCompanyForm = () => {
  return (
    <div className="">
      <h2 className="font-bold text-2xl text-center mb-5">Add Company</h2>

      <form action="" className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Company name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Company Name</span>
            </div>
            <input
              required
              type="text"
              placeholder="Company name here"
              className="input input-bordered w-full"
            />
          </label>

          {/* Company Location */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Company Location</span>
            </div>
            <input
              required
              type="text"
              placeholder="Company location here"
              className="input input-bordered w-full"
            />
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Contact person's number */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Contact person&apos;s number</span>
            </div>
            <input
              required
              type="text"
              placeholder="Contact person&apos;s number here"
              className="input input-bordered w-full"
            />
          </label>

          {/* Contact person&apos;s name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Contact person&apos;s name</span>
            </div>
            <input
              required
              type="text"
              placeholder="Contact person&apos;s name here"
              className="input input-bordered w-full"
            />
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Company&apos;s Telephone */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Company&apos;s Telephone</span>
            </div>
            <input
              required
              type="text"
              placeholder="Company&apos;s Telephone here"
              className="input input-bordered w-full"
            />
          </label>

          {/* Number of staff */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Number of staff</span>
            </div>
            <input
              required
              type="text"
              placeholder="Number of staff here"
              className="input input-bordered w-full"
            />
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Company email */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Company email</span>
            </div>
            <input
              required
              type="email"
              placeholder="Company email here"
              className="input input-bordered w-full"
            />
          </label>

          {/* Company&apos;s Registration Document */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Company&apos;s Registration Document
              </span>
            </div>
            <input
              required
              type="file"
              placeholder="Company&apos;s Registration Document here"
              className="file-input input-bordered w-full"
            />
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Director's National ID */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Director&apos;s National ID</span>
            </div>
            <input
              required
              type="text"
              placeholder="Director&apos;s National ID here"
              className="input input-bordered w-full"
            />
          </label>

          {/* Director&apos;s National ID */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Director&apos;s National ID</span>
            </div>
            <input
              type="text"
              placeholder="Director&apos;s National ID here"
              className="input input-bordered w-full"
            />
          </label>
        </div>

        {/* submit */}
        <div className="!mt-10">
          <Button className="mx-auto w-1/2">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default OnboardCompanyForm;
