#
# Build stage
#
FROM maven:3.9 AS build
COPY . .
RUN mvn clean package -DskipTests

#
# Package stage
#
FROM openjdk:19-alpine
COPY --from=build /target/happypet-0.0.1-SNAPSHOT.jar happypet.jar
# ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java","-jar","happypet.jar"]
