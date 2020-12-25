#stage -1  for volume mounting maven dependencies
FROM maven:3.6-jdk-11 AS build
COPY pom.xml .
RUN mvn -Dmaven.repo.local=$MVN_LOCAL_REPO dependency:go-offline
COPY src src
RUN mvn -Dmaven.repo.local=$MVN_LOCAL_REPO -f pom.xml clean package -DskipTests

#stage -2 for creating the image of the project
FROM openjdk:11
EXPOSE 5000
COPY --from=build /target/xtrack-server-0.0.1-SNAPSHOT.jar xtrack-server.jar
ENTRYPOINT ["java", "-jar", "/xtrack-server.jar"]
