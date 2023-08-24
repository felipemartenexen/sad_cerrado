<?php

    

//   ******************  DATABASE FUNCTIONS  ********************************

    function count_field_val($pdo, $tbl, $fld, $val) {
         try {
              $sql="SELECT {$fld} FROM {$tbl} WHERE {$fld}=:value";
              $stmnt=$pdo->prepare($sql);
              $stmnt->execute([':value'=>$val]);
              return $stmnt->rowCount();
         } catch(PDOException $e) {
              return $e->getMessage();
         }
    }

    function return_field_data($pdo, $tbl, $fld, $val) {
         try {
              $sql="SELECT * FROM {$tbl} WHERE {$fld}=:value";
              $stmnt=$pdo->prepare($sql);
              $stmnt->execute([':value'=>$val]);
              return $stmnt->fetch();
         } catch(PDOException $e) {
              return $e->getMessage();
         }
    }

    function get_validationcode($user, $pdo) {
         try {
              $stmnt=$pdo->prepare("SELECT validationcode FROM users WHERE username=:username");
              $stmnt->execute([':username'=>$user]);
              $row = $stmnt->fetch();
              return $row['validationcode'];
         } catch(PDOException $e) {
              return $e->getMessage();
         }        
    }

    function update_login_date($pdo, $user) {
         try {
              $stmnt=$pdo->prepare("UPDATE users SET last_login=current_date WHERE username=:username");
              $stmnt->execute([':username'=>$user]);
         } catch(PDOException $e) {
              return $e->getMessage();
         }        
    }

    function verify_user_group($pdo, $user, $group) {
        $user_row = return_field_data($pdo, "users", "username", $user);
        $user_id = $user_row['id'];
        $group_row = return_field_data($pdo, "groups", "name", $group);
        $group_id = $group_row['id'];
         try {
              $sql="SELECT id FROM user_group_link WHERE user_id={$user_id} AND group_id={$group_id}";
              $stmnt=$pdo->query($sql);
              if ($stmnt->rowCount()>0) {
                  return true;
              } else {
                  return false;
              }
         } catch(PDOException $e) {
              echo $e->getMessage();
              return false;
         }
    }

    function user_pages_count($pdo, $user) {
        try {
            $sql="SELECT u.username, g.name AS group_name, g.descr AS group_descr, p.name ";
            $sql.="as page_name, p.descr as page_descr, p.url ";
            $sql.="FROM users u JOIN user_group_link gu ON u.id=gu.user_id ";
            $sql.="JOIN groups g ON gu.group_id=g.id ";
            $sql.="JOIN pages p ON g.id=p.group_id ";
            $sql.="WHERE username='{$user}' ";
            $sql.="ORDER BY group_name";
            $result = $pdo->query($sql);
            return $result->rowCount();
        } catch(PDOException $e){
            echo "Oops there was an error<br><br>".$e->getMessage();
        }
    }