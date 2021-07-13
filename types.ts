// deno-lint-ignore-file

export type EENAuth = {
  username: string;
  password: string;
  apiKey?: string;
  baseHost?: string;
}

export type EENUser = {
  last_name?: string;
  postal_code?: string;
  active_brand_subdomain?: string;
  is_edit_ptz_stations?: number;
  is_live_video?: number;
  is_distributor?: number;
  is_superuser?: number;
  is_edit_all_and_add?: number;
  is_view_location_group?: number;
  utc_offset?: number;
  street?: string[];
  is_view_shipment?: number;
  is_active?: number;
  is_edit_archive?: number;
  is_b2d2?: number;
  is_view_preview_video?: number;
  permissions?: any[];
  is_edit_location_group?: number;
  is_edit_camera_less_billing?: number;
  alternate_email?: string | null;
  access_period?: string[];
  is_edit_motion_areas?: number;
  is_pending?: number;
  is_mobile_branded?: number;
  is_edit_distributor?: number;
  is_export_video?: number;
  layouts?: string[];
  is_staff?: number;
  first_name?: string;
  is_terms_noncompliant?: number;
  state?: string | null;
  last_login?: string;
  camera_access?: [];
  notify_period?: [];
  email?: string;
  is_user_create_layout?: string;
  is_user_admin?: string;
  saved_filters?: [];
  is_view_contract?: string;
  is_view_all_accounts?: number;
  is_edit_sharing?: number;
  account_work_days?: string;
  language?: string;
  country?: string;
  is_ptz_live?: number;
  is_two_factor_authentication_enabled?: number;
  is_sms_include_picture?: number;
  is_payment?: number;
  account_map_lines?: string | null;
  is_account_superuser?: number;
  city?: string | null;
  user_id?: string;
  is_notify_enable?: string;
  owner_account_id?: string;
  temp_account_access?: [];
  json?: any;
  is_edit_map?: number;
  is_all_camera_access?: number;
  is_view_invoice?: number;
  is_view_distributor?: number;
  mobile_phone?: string | null;
  weekly_newsletter?: number;
  account_utc_offset?: number;
  phone?: string | null;
  is_edit_admin_users?: number;
  is_device_admin?: number;
  is_branded?: number;
  active_account_id?: string;
  is_edit_users?: number;
  is_master?: number;
  is_edit_all_users?: number;
  uid?: string;
  is_all_layout_access?: number;
  account_work_hours?: string[];
  active_white_label_domain?: string | null;
  is_edit_account?: number;
  timezone?: string;
  id?: string;
  is_system_notifications_disabled?: number;
  is_edit_cameras?: number;
  is_edit_plugins?: number;
  is_edit_camera_on_off?: number;
  inactive_session_timeout?: number | null;
  is_recorded_video?: number;
  user_authenticated_clients?: number | string | null;
  is_layout_admin?: number;
  is_order?: number;
  user_log_level?: number;
  is_view_archive?: number;
  sms_phone?: null;
  is_view_audit_trail?: number;
  is_view_plugins?: number;
  notify_rule?: string[];
  user_pin?: string;
};

export type EENAccount = {
  id?: string; //Account ID automatically generated and assigned during creation
  name?: string; //Name of the account
  contact_first_name?: string; //First name of primary contact for account
  contact_last_name?: string; //Last name of primary contact for account
  contact_email?: string; //Email of primary contact for account
  contact_street?: string[]; //Array of strings containing street addresses of the primary contact for account ['address line 1', 'address line 2']
  contact_city?: string; //City of primary contact for account
  contact_state?: string; //State/province of primary contact for account
  contact_postal_code?: string; //Zip/postal code of primary contact for account
  contact_country?: string; //Country code of primary contact for account
  contact_phone?: string; //Phone number of primary contact for account
  contact_mobile_phone?: string; //Mobile phone number of primary contact for account
  owner_account_id?: string; //ID of the parent account (defaults to the account of the creating user)  ✗
  timezone?: string; //Timezone of the account (defaults to 'US/Pacific') Possible values: 'US/Alaska', 'US/Arizona', 'US/Central', 'US/Eastern', 'US/Hawaii', 'America/Anchorage', 'UTC', …
  status?: string[]; //Account status. This can only be edited by superusers and account superusers from the parent/owner account Possible values: 'active' - normal working state | 'inactive' - logins are not allowed | 'suspended' - effectively no longer operational | 'pending_validation' - default state after account creation (before the user has validated the account)
  utc_offset?: number; //Signed integer offset in seconds of the timezone from UTC. Automatically generated based on the timezone field  ✗
  access_restriction?: string[]; //Array of strings containing access restrictions Possible values: 'enable_mobile' - has access to mobile clients | 'enable_ip_restrictions' - if present and if 'allowable_ip_address_range' has been specified, limits logins to the address ranges specified  ✗
  allowable_ip_address_range?: string[]; //Each entry in the array specifies one address range. Entries use the '/' format. For example, to limit access to '192.168.123.0-192.168.123.255', the entry would be '192.168.123.0/24'. If no entries are present, '0.0.0.0/0' is implied  ✗
  session_duration?: number; // Session duration in minutes. Session duration of 0 means stay logged in forever
  holiday?: string[]; //This field is no longer being used (DEPRECATED)
  work_days?: string; //String of length 7. Each position in the string corresponds to a day of the week. Monday is position 0, Tuesday is position 1, etc. Each character in the string can have a value of 1 or 0. 1 means that this day is a work day
  work_hours?: string[]; //Two entries. Each entry containing a time expressed in local time. The first entry in the array is the work day start time. The second entry in the array is the stop time. Times are represented using a 24 hour clock and are formatted as HHMM | Example: 8AM would be 0800 and 5PM would be 1700
  alert_mode?: string[]; //Array of strings containing possible alert modes as defined for this account. Accepts an array of any number of strings of varying length. This controls what values are able to be chosen for the 'active_alert_mode' field
  active_alert_mode?: string; //A string chosen from values in the account 'alert_mode' array. Must be blank or one of the values defined in the alert_mode array. This is used to determine when to send motion alert notifications (defined by camera settings in the device model). If a motion alert is defined with an alert mode from one of the strings in the account ‘alert_mode’ array, then the notifications triggered from that motion alert will only be sent when the account 'active_alert_mode' is also set to that same alert mode string defined for that motion alert
  default_camera_passwords?: string; //Comma-delimited string of default camera passwords
  camera_shares?: []; // Array of arrays with each sub-array representing a camera to be shared to 1 or more recipients. First position is camera ID. The next positions are populated by one or multiple recipients. All recipients are comma-separated string values of 'email,account', where the 'account' can be omitted (will be automatically populated if the email address is registered to an account in the system) Example: [ [ '12345678', 'joe@em.com,His account', 'joe2@dd.com,That account' ] ] Note: camera_shares and camera_share_perms are co-dependent and need to be updated together
  camera_share_perms?: {}; //Json object keyed with camera IDs representing all recipients per camera and all permissions per recipient Example: '12345678': { 'joe@em.com,His account': [ 'edit_motion_areas', 'ptz_live', 'edit_ptz_stations' ] } Note: camera_shares and camera_share_perms are co-dependent and need to be updated together
  is_revoke_admins?: number; //Indicates whether to revoke all admin permissions for the users in the account (1) or not (0). This field doesn’t save anything on the account itself. It will revoke admin privileges of any admins in the account
  is_master?: number; //Indicates whether the account is a master account (1) or not (0)  ✗
  is_active?: number; //Indicates whether the account is active (1) or not (0)  ✗
  is_inactive?: number; //Indicates whether the account is inactive (1) or not (0)
  is_suspended?: number; //Indicates whether the account is suspended (1) or not (0)
  product_edition?: string; //Product edition the account is using  ✗
  camera_quantity?: number; //Total number of cameras the account is allowed to use  ✗
  is_custom_brand_allowed?: number; //Indicates whether the account is allowed to have branding (1) or not (0)
  is_custom_brand?: number; //Indicates whether the account has branding enabled (1) or not (0)
  brand_logo_small?: string; //Base64 encoded image for the branded small logo (PNG, 160x52, transparent background)
  brand_logo_large?: string; //Base64 encoded image for the branded large logo (PNG, 460x184, white background)
  brand_subdomain?: string; //Sub domain for the branded url
  brand_corp_url?: string; //Corporate website url
  brand_name?: string; //Branded company name
  brand_saml_publickey_cert?: string; //Public certificate which Eagle Eye Networks will use to decrypt the SAML for SSO
  brand_saml_nameid_path?: string; //The path within the SAML xml to find the users email address
  is_without_initial_user?: string; //Indicates whether to create the new account without an initial user (1) or not (0) (defaults to 0) | An initial user with 'is_account_superuser=1' will be created using the arguments 'contact_first_name/contact_last_name/contact_email' specified upon account creation
  customer_id?: string; //Arbitrary ID assigned to a sub-account by a master account
  is_master_video_disabled_allowed?: number; //Indicates whether a sub-account can block video access to reseller (1) or not (0)
  is_master_video_disabled?: number; //Indicates whether video access is blocked to reseller (1) or not (0)
  is_contract_recording?: number; //Indicates whether the account is of type contract_recording. Controls whether contract recording features are enabled for the users in this account on the front-end GUI (1) or not (0)
  is_advanced_disabled?: number; //Indicates whether the reseller has disabled advanced functionality (1) or not (0) If this is set for a sub-account, the users in the sub-account cannot change any settings related to bandwidth, billing (retention and resolution) and certain account settings. Master users switched in still can modify these things if their permissions allow it
  is_billing_disabled?: number; //Indicates whether the reseller has disabled editing settings in a sub-account that affect billing (1) or not (0). This controls whether users can change camera resolution/retention, add/delete cameras, etc
  is_add_delete_disabled?: number; //Indicates whether the reseller has disabled adding or deleting devices (1) or not (0)
  is_disable_all_settings?: number; //Indicates whether the reseller has disabled all device and most account settings (1) or not (0). Does not affect editing users, layouts, or sharing
  first_responders?: []; //[array [ string ] ]  Array of arrays with each sub-array representing an emergency responder. Accounts can identify a list of email accounts that will serve as emergency responders. Emergency responders get access to the identified 'responder_cameras' during an emergency (triggered by setting 'responder_active'). A responder is identified by their email, first name, last name, company and their account | Example:[[ 'mark@responders.com', 'Mark', 'O'Malley', 'Responders', 'Fake Account']]
  responder_active?: any; //Type not listed in EEN API docs, Indicates whether the responder cameras can be seen by the users defined under 'first_responders'
  responder_cameras?: string[]; //Array of camera ESNs that are shared to first responders
  inactive_session_timeout?: number; //Maximum time period in seconds without activity before web session expires
  login_attempt_limit?: number; //Maximum incorrect login attempts before the user account access becomes locked
  is_rtsp_cameras_enabled?: number; //Indicates whether the account can have cameras attached over RTSP (instead of ONVIF) (1) or not (0)
  brand_support_phone?: string; //Branded support phone number
  default_cluster?: string; //Indicates the data center cluster the account is assigned to
  is_system_notification_images_enabled?: number; //Indicates whether email notifications about online/offlice status should contain images from those cameras (1) or not (0)
  map_lines?: {}; //This is used by the front end to overlay lines over a map of the cameras for the account
  is_two_factor_authentication_forced?: number; //Indicates whether Two-Factor Authentication is forced for all users in the account (1) or not and users are able to choose between Simple Authentication and TFA (0)
  contact_utc_offset?: number; //This field is no longer being used (DEPRECATED)
  password_management_rules?: {}; //JSON object representing settings for Users passwords.  ✓ (with feature flag)
  idp_settings?: {}; //JSON object representing Identity Provider
}