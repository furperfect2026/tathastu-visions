alter table public.contact_inquiries
  add constraint contact_inquiries_name_len check (char_length(name) between 1 and 120),
  add constraint contact_inquiries_email_len check (char_length(email) between 3 and 255),
  add constraint contact_inquiries_phone_len check (phone is null or char_length(phone) <= 30),
  add constraint contact_inquiries_interest_len check (interest is null or char_length(interest) <= 40),
  add constraint contact_inquiries_message_len check (char_length(message) between 1 and 4000);