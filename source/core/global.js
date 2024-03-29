var Global = {
    recent_meetings: new Array(),
    current_meeting: null,
    upcoming_meeting: null,
    current_member: null,
    currently_pinned: 0,
    current_page: '',
    previous_page: '',
    current_event: null,
    current_keyboard: null,
    current_network_keyboard: null,
    current_password_keyboard: null,
    current_passcode_keyboard: null,
    current_display: null,
    dialpad: null,
    inmeetingTime: 0,
    inmeetingTimer: null,
    new_meeting_id: 1,
    if_processing_canceled: 0,
    if_scrolling: 0,
    if_camera_muted: 0,

    settings: {
        language: null,
        network: null,
        timezone: null
    }
}
