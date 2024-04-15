package vn.edu.nlu.fit.nlugame.layer0.network.websocket;

import jakarta.websocket.EncodeException;
import jakarta.websocket.Encoder;
import jakarta.websocket.EndpointConfig;
import vn.edu.nlu.fit.nlugame.layer2.proto.Proto;

import java.io.IOException;
import java.io.OutputStream;

public class MessageEndcoder implements Encoder.BinaryStream<Proto.PacketWrapper> {

    @Override
    public void encode(Proto.PacketWrapper packetWrapper, OutputStream os) throws EncodeException, IOException {
        os.write(packetWrapper.toByteArray());
        os.flush();
    }

    @Override
    public void init(EndpointConfig config) {
        BinaryStream.super.init(config);
    }

    @Override
    public void destroy() {
        BinaryStream.super.destroy();
    }
}
