package com.jux.coffreapi.Controller;
import com.jux.coffreapi.Model.User;
import com.jux.coffreapi.Service.UserService;
import jakarta.persistence.Access;
import org.hibernate.annotations.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.security.access.annotation.Secured;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Secured("ADMIN")
    @GetMapping("admin/user/{id}")
    public User getUser(@PathVariable("id") final int id) {
        Optional<User> user = userService.getUser(id);
        return user.orElse(null);
    }

    @Secured("ADMIN")
    @GetMapping("admin/users")
    public Iterable<User> getUsers() {
        return userService.getUsers();
    }

    @Secured("ADMIN")
    @PostMapping("admin/user")
    public User createUsers(@ModelAttribute User user) {
        return userService.saveUser(user);

    }

    @Secured("ADMIN")
    @DeleteMapping("admin/user/{id}")
    public String removeUsers(@PathVariable int id) {
        userService.deleteUser(id);
        return "utilsateur supprimé";

    }

    @Secured("ADMIN")
    @PutMapping("/admin/updateuser/{id}")
    public String updatePassword(@PathVariable("id") final int id, @RequestParam("password") String password) {
        Optional<User> oldUser = userService.getUser(id);
        if (oldUser.isPresent()) {
            User newUser = oldUser.get();

            newUser.setPassword(password);
            userService.saveUser(newUser);

            return "mot de passe modifié";
        } else return null;
    }

    @Secured("ADMIN")
    @GetMapping("/admin/test" )
    public String accessTesterA(){
        return "test Admin OK";
    }

    @GetMapping("/user/test" )
    public String accessTesterU(){
        return "test User OK";
    }


}