echo "Building Docker image '${DOCKER_IMAGE_NAME}'"
# we target linux/amd64 to prevent the default arm64 to be taken on mac os
# buildx is an experimental feature (31/03/2021) and must be manually enabled.
# https://docs.docker.com/engine/reference/commandline/dockerd/
# here is a possible docker configuration file
# {
#   "debug": true,
#   "experimental": true
# }

docker buildx build --platform linux/amd64 --push -t ${DOCKER_IMAGE_NAME} .