import React, { useState } from "react";
import Button from "./ui/Button"

/**
 * Generic Form Component
 *
 * Props:
 *  title        string     — form heading
 *  children     ReactNode  — pass any Input, Select, or custom field components
 *  onSubmit     function   — called with the native submit event (e) — call your own logic
 *  submitLabel  string     — save button text (default: "Submit")
 *  isLoading    boolean    — external loading state
 *  onClose      function   — if passed, renders a Cancel button that calls this
 *
 * Usage:
 *  <Form title="Invite User" onSubmit={handleSubmit} onClose={onClose} submitLabel="Send Invite">
 *    <Input label="First Name" name="first_name" ... />
 *    <Input label="Email"      name="email"      ... />
 *    <Select label="Role"      name="role"        ... />
 *  </Form>
 */

const Form = ({
  title,
  children,
  onSubmit,
  submitLabel = "Submit",
  isLoading = false,
  onClose,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) await onSubmit(e);
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      {title && (
        <h2 className="text-base font-semibold text-black mb-4">{title}</h2>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Render whatever input components are passed in */}
        {children}

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="success"
            label={isLoading ? "Saving..." : submitLabel}
            size="sm"
            type="submit"
            disabled={isLoading}
          />
          {onClose && (
            <Button
              variant="cancel"
              label="Cancel"
              size="sm"
              type="button"
              onClick={onClose}
              disabled={isLoading}
            />
          )}
        </div>

      </form>
    </div>
  );
};

export default Form;