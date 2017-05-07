<?php
/**
 * Created by PhpStorm.
 * User: kafim
 * Date: 26/02/2017
 * Time: 12:19
 */

namespace DTRE\OeilSiteBundle\Entity;


use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToMany(targetEntity="DTRE\OeilSiteBundle\Entity\Group")
     * @ORM\JoinTable(name="fos_user_user_group",
     *      joinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="group_id", referencedColumnName="id")}
     * )
     */
    protected $groups;


    /**
     * @var string
     *
     * @ORM\Column(name="apiPassword", type="string", nullable=true, length=255)
     */
    private $apiPassword;

    /**
     * @var string
     *
     * @ORM\Column(name="apiToken", type="string", nullable=true, length=255)
     */
    private $apiToken;

    public function __construct()
    {
        parent::__construct();
    }

    public function getApiPassword()
    {
        return $this->apiPassword;
    }

    public function setApiPassword($apiPassword)
    {
        $this->apiPassword = $apiPassword;
    }

    public function getApiToken()
    {
        return $this->apiToken;
    }

    public function setApiToken($apiToken)
    {
        $this->apiToken = $apiToken;
    }
}