
# tren PC WINDOW run command sau trên Git Bash 
# Nhắc lại là run trên Git Bash
# ./protoc.v21.exe -I=. --java_out=. *.proto
cd compile-proto
npm run build-proto-3
mv compiled* ../../Client/Explore_NLU/assets/Scripts/proto
cd ..

# docker run -it --rm --entrypoint sh -v $PWD:/proto debian:stable-slim
./protoc.exe -I=. --java_out=. Proto.proto
 cp -rf  vn/edu/nlu/fit/nlugame/layer2/proto ../Server/core/src/main/java/vn/edu/nlu/fit/nlugame/layer2
rm -rf  vn/edu/nlu/fit/nlugame/layer2/proto