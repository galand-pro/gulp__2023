<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
 
    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
 
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);
 
    // От кого письмо
    $mail->setFrom('info@gk-veles.ru', 'GK-Veles');
    // Кому отправить
    $mail->addAddress('locationmsk@gmail.com');
    // Тема письма
    $mail->Subject = 'Сообщение с сайта';
 
    // Тело письма
    $body = '<h1>Информация о заявителе</h1>';
 
    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['phone']))){
        $body.='<p><strong>Phone:</strong> '.$_POST['phone'].'</p>';
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
    }
 
    // Прикрепить файл
    if (!empty($_FILES['image']['tmp_name'])) {
        // путь загрузки файла
        $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
        // грузим файл
        if (copy($_FILES['image']['tmp_name'], $filePath)){
            $fileAttach = $filePath;
            $body.='<p><strong>Файл в приложении</strong></p>';
            $mail->addAttachment($fileAttach);
        }
    }
 
    $mail->Body = $body;
 
    // Отправляем
    if (!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены!';
    }
 
    $response = ['message' => $message];
 
    header('Content-type: application/json');
    echo json_encode($response);
?>
