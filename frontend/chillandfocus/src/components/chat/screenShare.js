import React, { useEffect, useRef, useState } from 'react';

const ScreenSharing = ({ roomName }) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const peerConnection = useRef(null);

    useEffect(() => {
        const ws = new WebSocket(`ws://127.0.0.1:8000/ws/screen-share/${roomName}/`);
        setSocket(ws);

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);

            if (data.offer) {
                handleOffer(data.offer);
            } else if (data.answer) {
                handleAnswer(data.answer);
            } else if (data.candidate) {
                handleCandidate(data.candidate);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket closed');
        };

        return () => {
            ws.close();
        };
    }, [roomName]);

    const startScreenShare = async () => {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        localVideoRef.current.srcObject = stream;

        // Tạo peer connection
        peerConnection.current = new RTCPeerConnection();

        stream.getTracks().forEach(track => {
            peerConnection.current.addTrack(track, stream);
        });

        peerConnection.current.onicecandidate = (e) => {
            if (e.candidate) {
                socket.send(JSON.stringify({ candidate: e.candidate }));
            }
        };

        peerConnection.current.ontrack = (e) => {
            remoteVideoRef.current.srcObject = e.streams[0];
        };

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.send(JSON.stringify({ offer }));
    };

    const handleOffer = async (offer) => {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.send(JSON.stringify({ answer }));
    };

    const handleAnswer = async (answer) => {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const handleCandidate = async (candidate) => {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    };

    return (
        <div>
            <h2>Screen Sharing Room: {roomName}</h2>
            <button onClick={startScreenShare}>Start Screen Share</button>
            <video ref={localVideoRef} autoPlay playsInline />
            <video ref={remoteVideoRef} autoPlay playsInline />
        </div>
    );
};

export default ScreenSharing;
