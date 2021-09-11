parse.js - for parsing CSV file of all sessions, into an array of sessions.

parse-to-map - converts CSV to a JSON mapping of ID to item (used for Speaker info)

parse-media - converts CSV to JSON mapping of media ID to media content (also cleans up HTML)

Example usage:

    node parse-media.js Event_Pilot_Media.csv "ID"
    