(data) => {
    if (
    data["initial_assesment/glasgow_coma_scale_gcs:0/best_eye_response_e/value|ordinal"] 
    && data["initial_assesment/glasgow_coma_scale_gcs:0/best_verbal_response_v/value|ordinal"] 
    && data["initial_assesment/glasgow_coma_scale_gcs:0/best_motor_response_m/value|ordinal"]) {
        return data["initial_assesment/glasgow_coma_scale_gcs:0/best_eye_response_e/value|ordinal"] 
        + data["initial_assesment/glasgow_coma_scale_gcs:0/best_verbal_response_v/value|ordinal"] 
        + data["initial_assesment/glasgow_coma_scale_gcs:0/best_motor_response_m/value|ordinal"]
    }
}
