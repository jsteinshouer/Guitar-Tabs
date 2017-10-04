FROM ortussolutions/commandbox

# Create app directory
WORKDIR /app

COPY . .

ENV HEADLESS=true

RUN box install