import tensorflow as tf
import numpy as np
import cv2

# Constants for image dimensions and number of classes
IMAGE_HEIGHT, IMAGE_WIDTH = 224, 224
NUM_CLASSES = 10

# Generate synthetic training data (placeholder, not used in real-time prediction)
x_train = np.random.random((100, IMAGE_HEIGHT, IMAGE_WIDTH, 3))
y_train = np.random.randint(0, NUM_CLASSES, 100)
y_train = tf.keras.utils.to_categorical(y_train, NUM_CLASSES)

# Define a simple CNN model architecture
model = tf.keras.models.Sequential([
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(IMAGE_HEIGHT, IMAGE_WIDTH, 3)),
    tf.keras.layers.MaxPooling2D(2, 2),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(NUM_CLASSES, activation='softmax')
])

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Load your model weights or train the model
# model.load_weights('path_to_your_model_weights.h5')  # Uncomment this line if you have pre-trained weights

# Camera setup
cap = cv2.VideoCapture(0)  # '0' assumes use of the default camera

try:
    while True:
        ret, frame = cap.read()  # Read one frame from the camera
        if not ret:
            break

        # Resize and preprocess the frame to fit the model input
        frame_resized = cv2.resize(frame, (IMAGE_HEIGHT, IMAGE_WIDTH))
        frame_normalized = frame_resized / 255.0  # Normalize pixel values if required by your model

        # Convert the frame to a batch of one (batch size, height, width, channels)
        frame_batch = np.expand_dims(frame_normalized, axis=0)

        # Predict using the TensorFlow model
        predictions = model.predict(frame_batch)
        predicted_class = np.argmax(predictions, axis=1)[0]

        # Display the prediction and the frame
        cv2.putText(frame_resized, f'Predicted class: {predicted_class}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1,
                    (0, 255, 0), 2, cv2.LINE_AA)
        cv2.imshow('Camera Output', frame_resized)

        if cv2.waitKey(1) & 0xFF == ord('q'):  # Exit loop when 'q' is pressed
            break
finally:
    cap.release()  # Release the camera
    cv2.destroyAllWindows()  # Close all OpenCV windows