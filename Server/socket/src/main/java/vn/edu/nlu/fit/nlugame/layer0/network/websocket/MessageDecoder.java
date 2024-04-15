package vn.edu.nlu.fit.nlugame.layer0.network.websocket;

import jakarta.websocket.DecodeException;
import jakarta.websocket.Decoder;
import jakarta.websocket.EndpointConfig;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class MessageDecoder implements Decoder.BinaryStream<Proto.PacketWrapper> {
    @Override
    public Proto.PacketWrapper decode(InputStream is) throws DecodeException, IOException {
        byte[] bytes2 = readAllBytes(is);
        return Proto.PacketWrapper.parseFrom(bytes2);
    }
    @Override
    public void init(EndpointConfig config) {
        BinaryStream.super.init(config);
    }

    @Override
    public void destroy() {
        BinaryStream.super.destroy();
    }

    public byte[] readAllBytes(InputStream is) throws IOException {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        byte[] buffer = new byte[2048];
        int bytesRead;

        while ((bytesRead = is.read(buffer)) != -1) {
            output.write(buffer, 0, bytesRead);
        }

        return output.toByteArray();
    }
}
