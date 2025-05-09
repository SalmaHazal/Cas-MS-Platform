package org.example.chatservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.chatservice.common.BaseAuditingEntity;
import org.example.chatservice.constants.UserConstants;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
@NamedQuery(name = UserConstants.FIND_USER_BY_EMAIL,
            query = "SELECT u FROM User u WHERE u.email = :email")
@NamedQuery(name = UserConstants.FIND_ALL_USERS_EXCEPT_SELF,
            query = "SELECT u FROM User u WHERE u.id != :publicId")
@NamedQuery(name = UserConstants.FIND_USER_BY_PUBLIC_ID,
            query = "SELECT u FROM User u WHERE u.id = :publicId")

public class User {

    private static final int LAST_ACTIVE_INTERVAL = 5;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private Gender gender;

    private String question;

    private LocalDateTime lastSeen;

    private String role;

    @OneToMany(mappedBy = "sender")
    private List<Chat> chatsAsSender;

    @OneToMany(mappedBy = "recipient")
    private List<Chat> chatsAsRecipient;

    @Transient
    public boolean isUSerOnline() {
        return lastSeen != null && lastSeen.isAfter(LocalDateTime.now().minusMinutes(LAST_ACTIVE_INTERVAL));
    }

}

